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
                'image'  => $act->event_poster,
                'type'   => $act->kp_category,
                'points' => (int) $act->kp_amount,
                'date'   => \Carbon\Carbon::parse($act->date)->format('l, d F Y'),
            ];
        });

        return response()->json($formatted);
    }

    private function filterByCategory(Builder $query, Request $request): Builder
    {
        if ($request->has('category') && $request->input('category') !== '' && $request->input('category') !== 'All') {
            return $query->where('kp_category', $request->input('category'));
        }
        return $query;
    }
}
