<?php

namespace App\Http\Controllers;

use App\Models\KP_Progress;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class ProfileController extends Controller
{
    #[OA\Get(
        path: "/api/profile/{user}",
        summary: "Get a user's profile and KP category progress summary",
        tags: ["Profile"]
    )]
    #[OA\Parameter(
        name: "user",
        in: "path",
        required: true,
        description: "UserID",
        schema: new OA\Schema(type: "integer", example: 2)
    )]
    #[OA\Response(
        response: 200,
        description: "Profile retrieved successfully",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(
                    property: "user",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 2),
                        new OA\Property(property: "name", type: "string", example: "Andi Tubagus Faatih Keane"),
                        new OA\Property(property: "nim", type: "string", example: "1234567890"),
                        new OA\Property(property: "email", type: "string", format: "email", example: "atubagus@student.ciputra.ac.id"),
                        new OA\Property(property: "jurusan", type: "string", nullable: true, example: "IMT", description: "Study program code; null for admins"),
                        new OA\Property(property: "role", type: "string", example: "student"),
                        new OA\Property(property: "profile_picture", type: "string", nullable: true, example: "https://i.pravatar.cc/300?u=ken.student"),
                    ]
                ),
                new OA\Property(
                    property: "kp_categories",
                    type: "array",
                    items: new OA\Items(
                        type: "object",
                        properties: [
                            new OA\Property(property: "id", type: "integer", example: 7, description: "ProgressID (per-user category row)"),
                            new OA\Property(property: "title", type: "string", example: "Talkshow (Wajib BMA)"),
                            new OA\Property(property: "current", type: "integer", example: 6),
                            new OA\Property(property: "target", type: "integer", example: 6),
                            new OA\Property(property: "status", type: "string", enum: ["Completed", "On Progress"], example: "Completed"),
                            new OA\Property(property: "percentage", type: "integer", example: 100),
                        ]
                    )
                ),
                new OA\Property(
                    property: "kp_summary",
                    type: "object",
                    properties: [
                        new OA\Property(property: "completed", type: "integer", example: 5),
                        new OA\Property(property: "in_progress", type: "integer", example: 7),
                        new OA\Property(property: "total_current", type: "integer", example: 36),
                        new OA\Property(property: "total_target", type: "integer", example: 100),
                        new OA\Property(property: "overall_percentage", type: "integer", example: 36),
                    ]
                ),
            ]
        )
    )]
    #[OA\Response(response: 404, description: "User not found")]
    public function show(int $user): JsonResponse
    {
        $userModel = User::query()->find($user);

        if (! $userModel) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        $kp = KP_Progress::summaryForUser((int) $userModel->UserID);

        return response()->json([
            'user' => [
                'id'              => $userModel->UserID,
                'name'            => $userModel->Name,
                'nim'             => $userModel->NIM,
                'email'           => $userModel->Email,
                'jurusan'         => $userModel->Jurusan,
                'role'            => $userModel->Role,
                'profile_picture' => $userModel->ProfilePicture,
            ],
            'kp_categories' => $kp['categories'],
            'kp_summary'    => $kp['summary'],
        ]);
    }
}
