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

        $formatted = $activities->map(function ($act) {
            return [
                'id'     => (string) $act->ActivityID,
                'title'  => $act->name,
                'image'  => $act->event_poster ? asset($act->event_poster) : null,
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
                new OA\Property(property: "date", type: "string", example: "Fri, 26 Feb 2026 07:30 - 09:30"),
                new OA\Property(property: "location", type: "string", example: "Auditorium, 7th Floor"),
                new OA\Property(property: "description", type: "string"),
                new OA\Property(property: "requirement", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "howToClaim", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "contactPerson", type: "array", items: new OA\Items(type: "string")),
                new OA\Property(property: "registrationLink", type: "string", example: "https://forms.google.com/..."),
            ]
        )
    )]
    public function getById(string $id): JsonResponse
    {
        $activity = Activity::where('ActivityID', $id)->first();

        if (!$activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }

        $organizer = $activity->user ? $activity->user->name : 'Unknown';

        return response()->json([
            'id'                    => (string) $activity->ActivityID,
            'title'                 => $activity->name,
            'image'                 => $activity->event_poster ? asset($activity->event_poster) : null,
            'organizer'             => $organizer,
            'type'                  => $activity->kp_category,
            'points'                => (int) $activity->kp_amount,
            'eligibleStudyProgram'  => $activity->eligible_study_program,
            'eligibleCohort'        => $activity->eligible_generation,
            'date'                  => \Carbon\Carbon::parse($activity->date)->format('l, d M Y') . ' ' . $activity->time,
            'location'              => $activity->location,
            'description'           => $activity->description,
            'requirement'           => $this->parseListField($activity->requirements),
            'howToClaim'            => $this->parseListField($activity->claiming_procedure),
            'contactPerson'         => $this->parseListField($activity->contact_person),
            'registrationLink'      => $activity->registration_link,
        ]);
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
}
