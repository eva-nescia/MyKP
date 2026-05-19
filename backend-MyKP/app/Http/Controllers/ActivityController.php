<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
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
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "Activities retrieved successfully",
        content: new OA\JsonContent(
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "string", example: "1"),
                    new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara"),
                    new OA\Property(property: "image", type: "string", example: "url or null"),
                    new OA\Property(property: "type", type: "string", example: "Talkshow Wajib BMA"),
                    new OA\Property(property: "points", type: "integer", example: 6),
                    new OA\Property(property: "date", type: "string", example: "Sat, 29 May 2026")
                ]
            )
        )
    )]
    public function getAll(Request $request): JsonResponse
    {
        $query = Activity::query();

        // Search filter — by title or type
        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('kp_category', 'LIKE', "%{$search}%");
            });
        }

        // Category filter
        $query = $this->filterByCategory($query, $request);

        $activities = $query->orderBy('date', 'desc')->get();

        $formatted = $activities->map(function ($act) use ($request) {
            return [
                'id'     => (string) $act->ActivityID,
                'title'  => $act->name,
                'image'  => $this->buildImageUrl($request, $act->event_poster),
                'type'   => $act->kp_category,
                'points' => (int) $act->kp_amount,
                'date'   => \Carbon\Carbon::parse($act->date)->format('l, d F Y'),
            ];
        });

        return response()->json($formatted);
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
                new OA\Property(property: "date", type: "string", example: "Fri, 26 Feb 2026"),
                new OA\Property(property: "startTime", type: "string", example: "07:30:00"),
                new OA\Property(property: "endTime", type: "string", example: "09:30:00"),
                new OA\Property(property: "location", type: "string", example: "Auditorium, 7th Floor"),
                new OA\Property(property: "description", type: "string"),
                new OA\Property(property: "requirement", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "howToClaim", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "contactPerson", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "registrationLink", type: "string", example: "https://forms.google.com/..."),
            ]
        )
    )]
    public function getById(Request $request, string $id): JsonResponse
    {
        $activity = Activity::where('ActivityID', $id)->with('user')->first();

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
            'date'                  => \Carbon\Carbon::parse($activity->date)->format('l, d M Y'),
            'startTime'             => $activity->start_time,
            'endTime'               => $activity->end_time,
            'location'              => $activity->location,
            'description'           => $activity->description,
            'requirement'           => $this->parseListField($activity->requirements),
            'howToClaim'            => $this->parseListField($activity->claiming_procedure),
            'contactPerson'         => $this->parseListField($activity->contact_person),
            'registrationLink'      => $activity->registration_link,
        ]);
    }

    /**
     * Build an absolute image URL based on the current request host.
     * Passes through if already an absolute URL (e.g. factory-generated fake URLs).
     */
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

    private function parseListField(?string $field): array
    {
        if (!$field) {
            return [];
        }

        return array_map(
            fn($item) => trim(ltrim($item, '•')),
            array_filter(explode("\n", $field), fn($item) => trim($item) !== '')
        );
    }

    private function filterByCategory(Builder $query, Request $request): Builder
    {
        if ($request->has('category') && $request->input('category') !== '' && $request->input('category') !== 'All') {
            return $query->where('kp_category', $request->input('category'));
        }
        return $query;
    }

    #[OA\Post(
        path: "/api/activities",
        summary: "Create a new activity (Admin only)",
        tags: ["Activities"],
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
                    new OA\Property(property: "requirements", type: "string"),
                    new OA\Property(property: "claiming_procedure", type: "string"),
                    new OA\Property(property: "contact_person", type: "string"),
                    new OA\Property(property: "registration_link", type: "string"),
                    new OA\Property(property: "registration_deadline_date", type: "string", format: "date"),
                    new OA\Property(property: "registration_deadline_time", type: "string", format: "time"),
                    new OA\Property(property: "event_poster", type: "string"),
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
                new OA\Property(property: "id", type: "string", example: "1"),
                new OA\Property(property: "message", type: "string", example: "Activity created successfully"),
            ]
        )
    )]
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
            'requirements' => 'nullable|string',
            'claiming_procedure' => 'nullable|string',
            'contact_person' => 'nullable|string',
            'registration_link' => 'nullable|url',
            'registration_deadline_date' => 'nullable|date',
            'registration_deadline_time' => 'nullable|date_format:H:i:s',
            'event_poster' => 'nullable', // Accept anything, we'll validate after
        ]);

        // Get the authenticated user's ID
        $userId = auth()->id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Handle image upload
        $posterPath = null;
        if ($request->hasFile('event_poster')) {
            try {
                $file = $request->file('event_poster');
                if ($file && $file->isValid()) {
                    // Ensure images directory exists and is writable
                    $imagesDir = public_path('images');
                    if (!is_dir($imagesDir)) {
                        mkdir($imagesDir, 0755, true);
                    }
                    if (!is_writable($imagesDir)) {
                        chmod($imagesDir, 0755);
                    }
                    
                    // Generate unique filename
                    $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                    $destination = $imagesDir . DIRECTORY_SEPARATOR . $filename;
                    
                    // Move the file
                    if ($file->move($imagesDir, $filename)) {
                        $posterPath = 'images/' . $filename;
                        \Log::info('Image uploaded successfully: ' . $posterPath);
                    } else {
                        \Log::error('Failed to move image file');
                    }
                }
            } catch (\Exception $e) {
                \Log::error('Image upload error: ' . $e->getMessage());
                // Don't fail the whole request if image fails - just log it
            }
        }

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
            'requirements' => $validated['requirements'] ?? null,
            'claiming_procedure' => $validated['claiming_procedure'] ?? null,
            'contact_person' => $validated['contact_person'] ?? null,
            'registration_link' => $validated['registration_link'] ?? null,
            'registration_deadline_date' => $validated['registration_deadline_date'] ?? null,
            'registration_deadline_time' => $validated['registration_deadline_time'] ?? null,
            'event_poster' => $posterPath,
        ]);

        return response()->json([
            'id' => (string) $activity->ActivityID,
            'message' => 'Activity created successfully',
        ], 201);
    }

    /**
     * Upload image for an existing activity
     */
    #[OA\Post(
        path: "/api/activities/{activityId}/upload-image",
        summary: "Upload image for activity",
        tags: ["Activities"],
    )]
    #[OA\Response(response: 200, description: "Image uploaded successfully")]
    public function uploadImage(Request $request, $activityId): JsonResponse
    {
        $activity = Activity::findOrFail($activityId);

        // Check authorization
        if ($activity->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'image_data' => 'required|string',
            'mime_type' => 'required|string',
            'file_name' => 'required|string',
        ]);

        try {
            // Decode base64 image
            $imageData = base64_decode($validated['image_data']);
            if ($imageData === false) {
                return response()->json(['error' => 'Invalid base64 data'], 400);
            }

            // Ensure images directory exists
            $imagesDir = public_path('images');
            if (!is_dir($imagesDir)) {
                mkdir($imagesDir, 0755, true);
            }

            // Delete old image if exists
            if ($activity->event_poster) {
                $oldPath = public_path($activity->event_poster);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Generate unique filename
            $ext = pathinfo($validated['file_name'], PATHINFO_EXTENSION) ?: 'jpg';
            $filename = time() . '_' . uniqid() . '.' . $ext;
            $filePath = $imagesDir . DIRECTORY_SEPARATOR . $filename;
            
            // Write file
            if (file_put_contents($filePath, $imageData) === false) {
                return response()->json(['error' => 'Failed to write file'], 500);
            }
            
            // Update activity with new image path
            $activity->update(['event_poster' => 'images/' . $filename]);
            
            \Log::info('Image uploaded for activity ' . $activityId . ': images/' . $filename);

            return response()->json([
                'message' => 'Image uploaded successfully',
                'event_poster' => 'images/' . $filename,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all activities created by the authenticated admin
     */
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
    public function getAdminActivities(): JsonResponse
    {
        $userId = auth()->id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

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

