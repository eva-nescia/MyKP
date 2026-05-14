<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class ActivityController extends Controller
{
    #[OA\Get(
        path: "/api/activities",
        summary: "Get all activities",
        tags: ["Activities"]
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
    public function getAll(): JsonResponse
    {
        $activities = Activity::query()
            ->orderBy('date', 'desc')
            ->get();

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
}
