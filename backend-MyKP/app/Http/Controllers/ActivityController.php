<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityClaimingProcedure;
use App\Models\ActivityContactPerson;
use App\Models\ActivityRequirement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use OpenApi\Attributes as OA;

class ActivityController extends Controller
{
    #[OA\Get(
        path: "/api/activities",
        summary: "Search activities by title or type",
        tags: ["Activities"],
        parameters: [
            new OA\Parameter(
                name: "search",
                in: "query",
                description: "Search by activity title or type",
                required: false,
                schema: new OA\Schema(type: "string", example: "seminar")
            ),
            new OA\Parameter(
                name: "category",
                in: "query",
                description: "Filter by activity category",
                required: false,
                schema: new OA\Schema(type: "string", example: "Talkshow Wajib BMA")
            ),
            new OA\Parameter(
                name: "page",
                in: "query",
                description: "Page number for pagination (default: 1)",
                required: false,
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "per_page",
                in: "query",
                description: "Results per page (default: 20, max: 100)",
                required: false,
                schema: new OA\Schema(type: "integer", example: 20)
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "Activities retrieved successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "data", type: "array", items: new OA\Items(
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "string", example: "1"),
                        new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara"),
                        new OA\Property(property: "image", type: "string", example: "url or null"),
                        new OA\Property(property: "type", type: "string", example: "Talkshow Wajib BMA"),
                        new OA\Property(property: "points", type: "integer", example: 6),
                        new OA\Property(property: "date", type: "string", example: "Sat, 29 May 2026")
                    ]
                )),
                new OA\Property(property: "total", type: "integer", example: 42),
                new OA\Property(property: "per_page", type: "integer", example: 20),
                new OA\Property(property: "current_page", type: "integer", example: 1),
                new OA\Property(property: "last_page", type: "integer", example: 3),
            ]
        )
    )]
    public function getAll(Request $request): JsonResponse
    {
        $perPage = min((int) $request->input('per_page', 20), 100); // Max 100 per page
        $page = max((int) $request->input('page', 1), 1);

        $query = Activity::query();

        // Search optimization: use indexed columns
        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $search = trim($search);
            
            // Split search into words for better matching
            $keywords = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);
            
            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->where(function ($innerQ) use ($keyword) {
                        $innerQ->where('name', 'LIKE', "%{$keyword}%")
                                ->orWhere('kp_category', 'LIKE', "%{$keyword}%");
                    });
                }
            });
        }

        $query = $this->filterByCategory($query, $request);

        // Get paginated results
        $paginated = $query
            ->orderBy('date', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        // Format response data
        $formatted = $paginated->map(function ($act) use ($request) {
            return [
                'id'     => (string) $act->ActivityID,
                'title'  => $act->name,
                'image'  => $this->buildImageUrl($request, $act->event_poster),
                'type'   => $act->kp_category,
                'points' => (int) $act->kp_amount,
                'date'   => \Carbon\Carbon::parse($act->date)->format('l, d F Y'),
            ];
        });

        return response()->json([
            'data' => $formatted,
            'total' => $paginated->total(),
            'per_page' => $paginated->perPage(),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }

    #[OA\Get(
        path: "/api/activities/{id}",
        summary: "Get activity details by ID",
        tags: ["Activities"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                description: "Activity ID",
                required: true,
                schema: new OA\Schema(type: "string", example: "1")
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "Activity details retrieved successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "string", example: "1"),
                new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara"),
                new OA\Property(property: "image", type: "string", example: "url or null"),
                new OA\Property(property: "organizer", type: "string", example: "BMA"),
                new OA\Property(property: "type", type: "string", example: "Talkshow Wajib BMA"),
                new OA\Property(property: "points", type: "integer", example: 6),
                new OA\Property(property: "eligibleStudyProgram", type: "string", example: "All Study Program"),
                new OA\Property(property: "eligibleCohort", type: "string", example: "All Gen"),
                new OA\Property(property: "date", type: "string", example: "8 August 2026"),
                new OA\Property(property: "startTime", type: "string", example: "07:30:00"),
                new OA\Property(property: "endTime", type: "string", example: "09:30:00"),
                new OA\Property(property: "location", type: "string", example: "Auditorium, 7th Floor"),
                new OA\Property(property: "description", type: "string"),
                new OA\Property(property: "requirement", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "howToClaim", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "contactPerson", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "registrationLink", type: "string", example: "https://forms.google.com/..."),
                new OA\Property(property: "registrationDeadlineDate", type: "string", format: "date", nullable: true, example: "2026-05-28"),
                new OA\Property(property: "registrationDeadlineTime", type: "string", format: "time", nullable: true, example: "23:59:00"),
            ]
        )
    )]
    public function getById(Request $request, string $id): JsonResponse
    {
        $activity = Activity::where('ActivityID', $id)
            ->with(['user', 'requirements', 'claimingProcedures', 'contactPersons'])
            ->first();

        if (!$activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }

        $organizer = $activity->user ? $activity->user->Name : 'Unknown';

        return response()->json([
            'id'                    => (string) $activity->ActivityID,
            'title'                 => $activity->name,
            'image'                 => $this->buildImageUrl($request, $activity->event_poster),
            'organizer'             => $organizer,
            'type'                  => $activity->kp_category,
            'points'                => (int) $activity->kp_amount,
            'eligibleStudyProgram'  => $activity->eligible_study_program,
            'eligibleCohort'        => $activity->eligible_generation,
            'date'                  => \Carbon\Carbon::parse($activity->date)->format('j F Y'),
            'startTime'             => $activity->start_time,
            'endTime'               => $activity->end_time,
            'location'              => $activity->location,
            'description'           => $activity->description,
            'requirement'           => $activity->requirements->pluck('value')->all(),
            'howToClaim'            => $activity->claimingProcedures->pluck('value')->all(),
            'contactPerson'         => $activity->contactPersons->pluck('value')->all(),
            'registrationLink'      => $activity->registration_link,
            'registrationDeadlineDate' => $activity->registration_deadline_date,
            'registrationDeadlineTime' => $activity->registration_deadline_time,
        ]);
    }

    public static function buildImageUrl(Request $request, ?string $poster): ?string
    {
        if (!$poster) {
            return null;
        }
        if (preg_match('/^https?:\/\//i', $poster)) {
            return $poster;
        }
        return $request->getSchemeAndHttpHost() . '/' . ltrim($poster, '/');
    }

    private function filterByCategory(Builder $query, Request $request): Builder
    {
        if ($request->has('category') && $request->input('category') !== '' && $request->input('category') !== 'All') {
            return $query->where('kp_category', $request->input('category'));
        }
        return $query;
    }

    /**
     * Accepts either a plain array of strings or a single newline/bullet
     * separated string and normalises it to a clean array of trimmed lines.
     */
    private function normaliseList(mixed $field): array
    {
        if ($field === null || $field === '') {
            return [];
        }

        if (is_array($field)) {
            $items = $field;
        } else {
            $items = explode("\n", (string) $field);
        }

        return array_values(array_filter(array_map(
            fn ($item) => trim(ltrim((string) $item, '•')),
            $items
        ), fn ($item) => $item !== ''));
    }

    private function syncRelatedItems(Activity $activity, array $payload): void
    {
        $map = [
            'requirements'        => [ActivityRequirement::class, 'requirements'],
            'claiming_procedure'  => [ActivityClaimingProcedure::class, 'claimingProcedures'],
            'contact_person'      => [ActivityContactPerson::class, 'contactPersons'],
        ];

        foreach ($map as $key => [$model, $relation]) {
            if (! array_key_exists($key, $payload)) {
                continue;
            }
            $activity->{$relation}()->delete();
            foreach ($this->normaliseList($payload[$key]) as $value) {
                $model::create([
                    'activity_id' => $activity->ActivityID,
                    'value'       => $value,
                ]);
            }
        }
    }

    #[OA\Post(
        path: "/api/activities",
        summary: "Create a new activity (Admin only)",
        tags: ["Activities"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: "object",
                properties: [
                    new OA\Property(property: "name", type: "string", example: "Seminar Title"),
                    new OA\Property(property: "kp_category", type: "string", example: "Talkshow Wajib BMA"),
                    new OA\Property(property: "kp_amount", type: "integer", example: 6),
                    new OA\Property(property: "eligible_generation", type: "string", example: "All Gen"),
                    new OA\Property(property: "eligible_study_program", type: "string", example: "All Prodi"),
                    new OA\Property(property: "date", type: "string", format: "date", example: "2026-05-29"),
                    new OA\Property(property: "start_time", type: "string", format: "time", example: "07:30:00"),
                    new OA\Property(property: "end_time", type: "string", format: "time", example: "09:30:00"),
                    new OA\Property(property: "location", type: "string", example: "Auditorium, 7th Floor"),
                    new OA\Property(property: "description", type: "string"),
                    new OA\Property(property: "requirements", type: "array", items: new OA\Items(type: "string"), example: ["Active UCM Student"]),
                    new OA\Property(property: "claiming_procedure", type: "array", items: new OA\Items(type: "string"), example: ["Auto input by BMA"]),
                    new OA\Property(property: "contact_person", type: "array", items: new OA\Items(type: "string"), example: ["081234567890 - Gladys"]),
                    new OA\Property(property: "registration_link", type: "string"),
                    new OA\Property(property: "registration_deadline_date", type: "string", format: "date"),
                    new OA\Property(property: "registration_deadline_time", type: "string", format: "time"),
                ]
            )
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Activity created successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "string", example: "1", description: "ActivityID of the newly created activity"),
                new OA\Property(property: "message", type: "string", example: "Activity created successfully"),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized — missing or invalid bearer token")]
    #[OA\Response(response: 403, description: "Forbidden — admin role required")]
    #[OA\Response(response: 422, description: "Validation error — see `errors` map for per-field messages")]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'kp_category' => 'required|string|max:255',
            'kp_amount' => 'required|integer|min:1',
            'eligible_generation' => 'required|string',
            'eligible_study_program' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable',
            'requirements.*' => 'string',
            'claiming_procedure' => 'nullable',
            'claiming_procedure.*' => 'string',
            'contact_person' => 'nullable',
            'contact_person.*' => 'string',
            'registration_link' => 'nullable|url',
            'registration_deadline_date' => 'nullable|date',
            'registration_deadline_time' => 'nullable|date_format:H:i:s',
        ]);

        $userId = auth()->id();

        $activity = DB::transaction(function () use ($validated, $userId, $request) {
            $activity = Activity::create([
                'user_id' => $userId,
                'name' => $validated['name'],
                'kp_category' => $validated['kp_category'],
                'kp_amount' => $validated['kp_amount'],
                'eligible_generation' => $validated['eligible_generation'],
                'eligible_study_program' => $validated['eligible_study_program'],
                'date' => $validated['date'],
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'location' => $validated['location'],
                'description' => $validated['description'] ?? null,
                'registration_link' => $validated['registration_link'] ?? null,
                'registration_deadline_date' => $validated['registration_deadline_date'] ?? null,
                'registration_deadline_time' => $validated['registration_deadline_time'] ?? null,
            ]);

            $this->syncRelatedItems($activity, [
                'requirements'       => $request->input('requirements'),
                'claiming_procedure' => $request->input('claiming_procedure'),
                'contact_person'     => $request->input('contact_person'),
            ]);

            return $activity;
        });

        return response()->json([
            'id' => (string) $activity->ActivityID,
            'message' => 'Activity created successfully',
        ], 201);
    }

    #[OA\Put(
        path: "/api/activities/{id}",
        summary: "Update an existing activity (Admin only)",
        tags: ["Activities"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                description: "ActivityID of the activity to update",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: "object",
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "kp_category", type: "string"),
                    new OA\Property(property: "kp_amount", type: "integer"),
                    new OA\Property(property: "eligible_generation", type: "string"),
                    new OA\Property(property: "eligible_study_program", type: "string"),
                    new OA\Property(property: "date", type: "string", format: "date"),
                    new OA\Property(property: "start_time", type: "string", format: "time"),
                    new OA\Property(property: "end_time", type: "string", format: "time"),
                    new OA\Property(property: "location", type: "string"),
                    new OA\Property(property: "description", type: "string"),
                    new OA\Property(property: "requirements", type: "array", items: new OA\Items(type: "string")),
                    new OA\Property(property: "claiming_procedure", type: "array", items: new OA\Items(type: "string")),
                    new OA\Property(property: "contact_person", type: "array", items: new OA\Items(type: "string")),
                    new OA\Property(property: "registration_link", type: "string"),
                    new OA\Property(property: "registration_deadline_date", type: "string", format: "date"),
                    new OA\Property(property: "registration_deadline_time", type: "string", format: "time"),
                ]
            )
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Activity updated successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "id", type: "string", example: "1"),
                new OA\Property(property: "message", type: "string", example: "Activity updated successfully"),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    #[OA\Response(response: 403, description: "Forbidden — admin role required")]
    #[OA\Response(response: 404, description: "Activity not found")]
    #[OA\Response(response: 422, description: "Validation error")]
    public function update(Request $request, string $id): JsonResponse
    {
        $activity = Activity::find($id);
        if (! $activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'kp_category' => 'sometimes|string|max:255',
            'kp_amount' => 'sometimes|integer|min:1',
            'eligible_generation' => 'sometimes|string',
            'eligible_study_program' => 'sometimes|string',
            'date' => 'sometimes|date',
            'start_time' => 'sometimes|date_format:H:i:s',
            'end_time' => 'sometimes|date_format:H:i:s',
            'location' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'requirements' => 'sometimes|nullable',
            'requirements.*' => 'string',
            'claiming_procedure' => 'sometimes|nullable',
            'claiming_procedure.*' => 'string',
            'contact_person' => 'sometimes|nullable',
            'contact_person.*' => 'string',
            'registration_link' => 'sometimes|nullable|url',
            'registration_deadline_date' => 'sometimes|nullable|date',
            'registration_deadline_time' => 'sometimes|nullable|date_format:H:i:s',
        ]);

        DB::transaction(function () use ($activity, $validated, $request) {
            $columnFields = array_intersect_key($validated, array_flip([
                'name', 'kp_category', 'kp_amount', 'eligible_generation',
                'eligible_study_program', 'date', 'start_time', 'end_time',
                'location', 'description', 'registration_link',
                'registration_deadline_date', 'registration_deadline_time',
            ]));

            if (! empty($columnFields)) {
                $activity->update($columnFields);
            }

            $relationPayload = [];
            foreach (['requirements', 'claiming_procedure', 'contact_person'] as $key) {
                if ($request->has($key)) {
                    $relationPayload[$key] = $request->input($key);
                }
            }
            if (! empty($relationPayload)) {
                $this->syncRelatedItems($activity, $relationPayload);
            }
        });

        return response()->json([
            'id' => (string) $activity->ActivityID,
            'message' => 'Activity updated successfully',
        ]);
    }

    #[OA\Delete(
        path: "/api/activities/{id}",
        summary: "Delete an activity by ID",
        tags: ["Activities"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                description: "ActivityID of the activity to delete",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "Activity deleted successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "message", type: "string", example: "Activity deleted successfully"),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    #[OA\Response(response: 403, description: "Forbidden — admin role required")]
    #[OA\Response(response: 404, description: "Activity not found")]
    public function destroy(string $id): JsonResponse
    {
        $activity = Activity::find($id);
        if (! $activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }

        // Delete associated image file if it exists
        if ($activity->event_poster) {
            $imagePath = public_path($activity->event_poster);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
                Log::info('Deleted image for activity ' . $id . ': ' . $activity->event_poster);
            }
        }

        // Delete related records (cascade handled by foreign keys, but explicit for clarity)
        $activity->requirements()->delete();
        $activity->claimingProcedures()->delete();
        $activity->contactPersons()->delete();

        // Delete the activity
        $activity->delete();

        Log::info('Activity deleted: ' . $id);

        return response()->json([
            'message' => 'Activity deleted successfully',
        ]);
    }

    #[OA\Post(
        path: "/api/activities/{activityId}/upload-image",
        summary: "Upload (or replace) the poster image for an existing activity via multipart/form-data.",
        tags: ["Activities"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "activityId",
                in: "path",
                required: true,
                description: "ActivityID of the activity to attach the image to",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    required: ["event_poster"],
                    properties: [
                        new OA\Property(
                            property: "event_poster",
                            type: "string",
                            format: "binary",
                            description: "Image file (jpeg, png, gif, webp, max 5 MB)"
                        ),
                    ]
                )
            )
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Image uploaded successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "message", type: "string", example: "Image uploaded successfully"),
                new OA\Property(property: "event_poster", type: "string", example: "images/1747654321_a1b2c3.jpg"),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    #[OA\Response(response: 403, description: "Forbidden — admin role required")]
    #[OA\Response(response: 404, description: "Activity not found")]
    #[OA\Response(response: 422, description: "Validation error — missing or invalid file")]
    public function uploadImage(Request $request, $activityId): JsonResponse
    {
        $activity = Activity::find($activityId);
        if (! $activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }

        $request->validate([
            'event_poster' => 'required|file|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
        ]);

        $file = $request->file('event_poster');

        $imagesDir = public_path('images');
        if (! is_dir($imagesDir)) {
            mkdir($imagesDir, 0755, true);
        }

        if ($activity->event_poster) {
            $oldPath = public_path($activity->event_poster);
            if (file_exists($oldPath)) {
                @unlink($oldPath);
            }
        }

        $ext = $file->getClientOriginalExtension() ?: 'jpg';
        $filename = time() . '_' . uniqid() . '.' . $ext;
        $file->move($imagesDir, $filename);

        $activity->update(['event_poster' => 'images/' . $filename]);

        Log::info('Image uploaded for activity ' . $activityId . ': images/' . $filename);

        return response()->json([
            'message' => 'Image uploaded successfully',
            'event_poster' => 'images/' . $filename,
        ]);
    }

    #[OA\Get(
        path: "/api/admin/activities",
        summary: "Get activities created by authenticated admin",
        tags: ["Activities"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Admin activities retrieved successfully",
        content: new OA\JsonContent(
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "string"),
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "kp_category", type: "string"),
                    new OA\Property(property: "date", type: "string"),
                    new OA\Property(property: "event_poster", type: "string"),
                ]
            )
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    #[OA\Response(response: 403, description: "Forbidden — admin role required")]
    public function getAdminActivities(): JsonResponse
    {
        $userId = auth()->id();

        $activities = Activity::where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => (string) $activity->ActivityID,
                    'name' => $activity->name,
                    'kp_category' => $activity->kp_category,
                    'kp_amount' => (int) $activity->kp_amount,
                    'date' => $activity->date,
                    'location' => $activity->location,
                    'eligible_generation' => $activity->eligible_generation,
                    'eligible_study_program' => $activity->eligible_study_program,
                    'event_poster' => $activity->event_poster,
                ];
            });

        return response()->json($activities);
    }
}
