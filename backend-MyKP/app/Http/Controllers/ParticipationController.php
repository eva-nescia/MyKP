<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\KP_Progress;
use App\Models\Participation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes as OA;

class ParticipationController extends Controller
{
    #[OA\Post(
        path: "/api/activities/{activity_id}/register",
        summary: "Register the authenticated user for an activity. Records a participation row and increments matching KP_Progress.",
        tags: ["Participations"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "activity_id",
                in: "path",
                required: true,
                description: "ActivityID of the activity to register for",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
        ]
    )]
    #[OA\Response(
        response: 201,
        description: "Registered",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "registered", type: "boolean", example: true),
                new OA\Property(property: "activity_id", type: "string", example: "1"),
                new OA\Property(property: "kp_category", type: "string", example: "Talkshow (Wajib BMA)"),
                new OA\Property(property: "kp_amount", type: "integer", example: 6),
                new OA\Property(property: "kp_progress_updated", type: "boolean", example: true),
            ]
        )
    )]
    #[OA\Response(response: 409, description: "Already registered")]
    #[OA\Response(response: 404, description: "Activity not found")]
    public function register(Request $request, string $activity_id): JsonResponse
    {
        $user = $request->user();

        $activity = Activity::query()->where('ActivityID', $activity_id)->first();
        if (! $activity) {
            return response()->json(['message' => 'Activity not found.'], 404);
        }

        $alreadyRegistered = Participation::query()
            ->where('user_id', $user->UserID)
            ->where('activity_id', $activity->ActivityID)
            ->exists();

        if ($alreadyRegistered) {
            return response()->json([
                'message'     => 'You have already registered for this activity.',
                'activity_id' => (string) $activity->ActivityID,
            ], 409);
        }

        $kpCategory = $activity->kp_category;
        $kpAmount   = (int) $activity->kp_amount;
        $kpProgressUpdated = false;

        // Wrap participation insert + KP_Progress bump in a transaction so we
        // never end up with a participation row whose KP wasn't applied.
        DB::transaction(function () use ($user, $activity, $kpCategory, $kpAmount, &$kpProgressUpdated) {
            Participation::create([
                'user_id'     => $user->UserID,
                'activity_id' => $activity->ActivityID,
                'kp_category' => $kpCategory,
                'kp_amount'   => $kpAmount,
                'status'      => 'Completed',
            ]);

            $progress = KP_Progress::query()
                ->where('user_id', $user->UserID)
                ->where('kp_category', $kpCategory)
                ->lockForUpdate()
                ->first();

            if ($progress) {
                $progress->kp_current_amount = (int) $progress->kp_current_amount + $kpAmount;
                $progress->kp_status = ($progress->kp_amount_requirement > 0
                    && $progress->kp_current_amount >= $progress->kp_amount_requirement)
                    ? 'Completed'
                    : 'On Progress';
                $progress->save();
                $kpProgressUpdated = true;
            }
        });

        return response()->json([
            'registered'         => true,
            'activity_id'        => (string) $activity->ActivityID,
            'kp_category'        => $kpCategory,
            'kp_amount'          => $kpAmount,
            'kp_progress_updated'=> $kpProgressUpdated,
        ], 201);
    }

    #[OA\Get(
        path: "/api/participations",
        summary: "List the authenticated user's participation history. Optionally filter by kp_category.",
        tags: ["Participations"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "category",
                in: "query",
                required: false,
                description: "Filter by kp_category (exact match on activity category name)",
                schema: new OA\Schema(type: "string", example: "Talkshow Wajib BMA")
            ),
        ]
    )]
    #[OA\Response(
        response: 200,
        description: "OK — sorted newest-registered first",
        content: new OA\JsonContent(
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "string", example: "1", description: "ParticipationID as a string"),
                    new OA\Property(property: "activity_id", type: "string", example: "1"),
                    new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara & Anti Narkoba 2026"),
                    new OA\Property(property: "organizer", type: "string", example: "BMA"),
                    new OA\Property(property: "date", type: "string", example: "Fri, 29 May 2026"),
                    new OA\Property(property: "kp", type: "string", example: "6 KP"),
                    new OA\Property(property: "status", type: "string", enum: ["Completed", "On Progress"], example: "Completed"),
                    new OA\Property(property: "kp_category", type: "string", example: "Talkshow (Wajib BMA)"),
                    new OA\Property(property: "image", type: "string", nullable: true, example: "http://10.0.0.5:8000/images/seminarAntiNarkoba.jpeg"),
                ]
            )
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized")]
    public function history(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Participation::query()
            ->where('participations.user_id', $user->UserID)
            ->join('activities', 'participations.activity_id', '=', 'activities.ActivityID')
            ->orderBy('participations.created_at', 'desc')
            ->select(
                'participations.ParticipationID',
                'participations.status',
                'participations.kp_amount',
                'participations.kp_category',
                'activities.ActivityID',
                'activities.name as activity_name',
                'activities.date as activity_date',
                'activities.event_poster',
                'activities.user_id as organizer_user_id',
            );

        if ($request->has('category') && trim((string) $request->input('category')) !== '') {
            $query->where('participations.kp_category', $request->input('category'));
        }

        $rows = $query->get();

        $organizerNames = \App\Models\User::query()
            ->whereIn('UserID', $rows->pluck('organizer_user_id')->unique()->filter())
            ->pluck('Name', 'UserID');

        $formatted = $rows->map(function ($row) use ($request, $organizerNames) {
            return [
                'id'          => (string) $row->ParticipationID,
                'activity_id' => (string) $row->ActivityID,
                'title'       => $row->activity_name,
                'organizer'   => $organizerNames[$row->organizer_user_id] ?? 'Unknown',
                'date'        => \Carbon\Carbon::parse($row->activity_date)->format('D, j F Y'),
                'kp'          => (int) $row->kp_amount . ' KP',
                'status'      => $row->status,
                'kp_category' => $row->kp_category,
                'image'       => ActivityController::buildImageUrl($request, $row->event_poster),
            ];
        });

        return response()->json($formatted);
    }
}
