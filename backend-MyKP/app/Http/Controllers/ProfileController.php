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
        description: "Profile retrieved successfully"
    )]
    #[OA\Response(
        response: 404,
        description: "User not found"
    )]
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
