<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Bookmark;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class BookmarkController extends Controller
{
    #[OA\Get(
        path: "/api/bookmarks",
        summary: "List the authenticated user's saved (bookmarked) activities, newest-first by save time",
        tags: ["Bookmarks"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "OK",
        content: new OA\JsonContent(
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "string", example: "1", description: "ActivityID as a string"),
                    new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara & Anti Narkoba 2026"),
                    new OA\Property(property: "image", type: "string", nullable: true, example: "http://10.0.0.5:8000/images/seminarAntiNarkoba.jpeg"),
                    new OA\Property(property: "organizer", type: "string", example: "BMA"),
                    new OA\Property(property: "type", type: "string", example: "Talkshow (Wajib BMA)"),
                    new OA\Property(property: "points", type: "integer", example: 6),
                    new OA\Property(property: "date", type: "string", example: "Friday, 29 May 2026"),
                ]
            )
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $activities = Activity::query()
            ->join('bookmarks', 'activities.ActivityID', '=', 'bookmarks.activity_id')
            ->where('bookmarks.user_id', $user->UserID)
            ->orderBy('bookmarks.created_at', 'desc')
            ->select('activities.*')
            ->get();

        $formatted = $activities->map(function ($act) use ($request) {
            $organizer = $act->user ? $act->user->Name : 'Unknown';
            return [
                'id'        => (string) $act->ActivityID,
                'title'     => $act->name,
                'image'     => ActivityController::buildImageUrl($request, $act->event_poster),
                'organizer' => $organizer,
                'type'      => $act->kp_category,
                'points'    => (int) $act->kp_amount,
                'date'      => \Carbon\Carbon::parse($act->date)->format('l, d F Y'),
            ];
        });

        return response()->json($formatted);
    }

    #[OA\Post(
        path: "/api/bookmarks",
        summary: "Save (bookmark) an activity for the authenticated user",
        tags: ["Bookmarks"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["activity_id"],
                properties: [
                    new OA\Property(property: "activity_id", type: "integer", description: "ActivityID to bookmark", example: 1),
                ]
            )
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Created — new bookmark inserted",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "saved", type: "boolean", example: true),
                new OA\Property(property: "activity_id", type: "string", example: "1"),
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: "OK — already bookmarked, no change",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "saved", type: "boolean", example: true),
                new OA\Property(property: "activity_id", type: "string", example: "1"),
            ]
        )
    )]
    #[OA\Response(response: 422, description: "Validation error — missing or non-existent activity_id")]
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'activity_id' => ['required', 'integer', 'exists:activities,ActivityID'],
        ]);

        $user = $request->user();

        $bookmark = Bookmark::firstOrCreate([
            'user_id'     => $user->UserID,
            'activity_id' => $data['activity_id'],
        ]);

        return response()->json([
            'saved'       => true,
            'activity_id' => (string) $bookmark->activity_id,
        ], $bookmark->wasRecentlyCreated ? 201 : 200);
    }

    #[OA\Delete(
        path: "/api/bookmarks/{activity_id}",
        summary: "Remove a bookmarked activity for the authenticated user",
        tags: ["Bookmarks"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "activity_id",
                in: "path",
                required: true,
                description: "ActivityID to un-bookmark",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "OK — bookmark removed (idempotent: returns 200 even if it wasn't bookmarked)",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "saved", type: "boolean", example: false),
                new OA\Property(property: "activity_id", type: "string", example: "1"),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    public function destroy(Request $request, string $activity_id): JsonResponse
    {
        $user = $request->user();

        Bookmark::where('user_id', $user->UserID)
            ->where('activity_id', $activity_id)
            ->delete();

        return response()->json([
            'saved'       => false,
            'activity_id' => $activity_id,
        ]);
    }

    #[OA\Get(
        path: "/api/bookmarks/{activity_id}",
        summary: "Check whether the authenticated user has bookmarked a specific activity",
        tags: ["Bookmarks"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "activity_id",
                in: "path",
                required: true,
                description: "ActivityID to check",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "OK",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "saved", type: "boolean", example: true),
                new OA\Property(property: "activity_id", type: "string", example: "1"),
            ]
        )
    )]
    public function show(Request $request, string $activity_id): JsonResponse
    {
        $user = $request->user();

        $exists = Bookmark::where('user_id', $user->UserID)
            ->where('activity_id', $activity_id)
            ->exists();

        return response()->json([
            'saved'       => $exists,
            'activity_id' => $activity_id,
        ]);
    }
}
