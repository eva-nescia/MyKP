<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KP_Progress;
use App\Models\Activity;
use Carbon\Carbon;
use OpenApi\Attributes as OA;

class DashboardController extends Controller
{
    #[OA\Get(
        path: "/api/dashboard",
        summary: "Get Student Dashboard Data",
        tags: ["Dashboard"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Student dashboard data retrieved successfully",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "userName", type: "string", example: "KenStudent"),
                new OA\Property(property: "kpProgress", type: "integer", example: 35),
                new OA\Property(property: "totalKP", type: "integer", example: 100),
                new OA\Property(
                    property: "activities",
                    type: "array",
                    items: new OA\Items(
                        type: "object",
                        properties: [
                            new OA\Property(property: "id", type: "string", example: "1"),
                            new OA\Property(property: "title", type: "string", example: "Seminar Bela Negara & Anti Narkoba 2026"),
                            new OA\Property(property: "type", type: "string", example: "Talkshow Wajib BMA"),
                            new OA\Property(property: "points", type: "integer", example: 6),
                            new OA\Property(property: "date", type: "string", example: "Thu, 29 May 2026")
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthorized - User not authenticated"
    )]
    #[OA\Response(
        response: 403,
        description: "Forbidden - Invalid or expired token"
    )]
    public function getStudentDashboard(Request $request)
    {
        $user = $request->user();

        $totalEarned = KP_Progress::where('user_id', $user->UserID)->sum('kp_current_amount');
        $totalRequired = 100;

        // Exclude archived (old) activities — those only exist to back
        // participation history and must not surface as live mandatory cards.
        $mandatoryActivities = Activity::where('kp_category', 'LIKE', '%Talkshow Wajib BMA%')
                                        ->where('archived', false)
                                        ->orderBy('date', 'asc')
                                        ->get();

        $formattedActivities = $mandatoryActivities->map(function ($act) use ($request) {
            return [
                'id' => (string) $act->ActivityID,
                'title' => $act->name,
                'image' => ActivityController::buildImageUrl($request, $act->event_poster),
                'type' => $act->kp_category,
                'points' => (int) $act->kp_amount,
                'date' => \Carbon\Carbon::parse($act->date)->format('l, d F Y'),
            ];
        });

        return response()->json([
            'userName' => $user->Name,
            'kpProgress' => (int) $totalEarned,
            'totalKP' => $totalRequired,
            'activities' => $formattedActivities
        ]);
    }
}