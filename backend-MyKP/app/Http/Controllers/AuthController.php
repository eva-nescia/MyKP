<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Http; // unused while Google login is disabled
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA; // <-- Must add this import!

#[OA\Info(
    version: "1.0.0",
    title: "MyKP API Documentation",
    description: "API documentation for the MyKP backend"
)]
class AuthController extends Controller
{
    #[OA\Post(
        path: "/api/login",
        summary: "Standard Email/Password Login",
        tags: ["Authentication"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["email", "password"],
            properties: [
                new OA\Property(property: "email", type: "string", format: "email", example: "test@example.com"),
                new OA\Property(property: "password", type: "string", format: "password", example: "password123")
            ]
        )
    )]
    #[OA\Response(
        response: 200, 
        description: "Successful login",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "token", type: "string", example: "1a2b3c4d5e6f7g8h9i0j..."),
                new OA\Property(
                    property: "user", 
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 1),
                        new OA\Property(property: "name", type: "string", example: "ExselAdmin"),
                        new OA\Property(property: "email", type: "string", format: "email", example: "exsel@admin.ac.id"),
                        new OA\Property(property: "role", type: "string", example: "admin")
                    ]
                )
            ]
        )
    )]
    #[OA\Response(
        response: 422, 
        description: "Validation error (e.g., wrong password)",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "message", type: "string", example: "Email or password is incorrect."),
                new OA\Property(
                    property: "errors",
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "email", 
                            type: "array", 
                            items: new OA\Items(type: "string", example: "Email or password is incorrect.")
                        )
                    ]
                )
            ]
        )
    )]
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('Email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->Password)) {
            throw ValidationException::withMessages([
                'email' => ['Email or password is incorrect.'],
            ]);
        }

        $token = Str::random(60);

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->UserID,
                'name' => $user->Name,
                'email' => $user->Email,
                'role' => $user->Role,
            ],
        ]);
    }

    // ==========================================================
    // GOOGLE LOGIN — temporarily disabled. Re-enable later.
    // ==========================================================
    // #[OA\Post(
    //     path: "/api/login/google",
    //     summary: "Login with Google OAuth Access Token",
    //     tags: ["Authentication"]
    // )]
    // #[OA\RequestBody(
    //     required: true,
    //     content: new OA\JsonContent(
    //         required: ["accessToken"],
    //         properties: [
    //             new OA\Property(
    //                 property: "accessToken",
    //                 type: "string",
    //                 description: "The access token provided by the Google prompt on the frontend",
    //                 example: "ya29.a0AfB_byCdefGHIJKlmnop..."
    //             )
    //         ]
    //     )
    // )]
    // #[OA\Response(
    //     response: 200,
    //     description: "Successful Google login (Same response as standard login)",
    //     content: new OA\JsonContent(
    //         properties: [
    //             new OA\Property(property: "token", type: "string", example: "1a2b3c4d5e6f7g8h9i0j..."),
    //             new OA\Property(
    //                 property: "user",
    //                 type: "object",
    //                 properties: [
    //                     new OA\Property(property: "id", type: "integer", example: 1),
    //                     new OA\Property(property: "name", type: "string", example: "KenStudent"),
    //                     new OA\Property(property: "email", type: "string", format: "email", example: "kokonatyeye@gmail.com"),
    //                     new OA\Property(property: "role", type: "string", example: "student")
    //                 ]
    //             )
    //         ]
    //     )
    // )]
    // #[OA\Response(
    //     response: 422,
    //     description: "Validation error (e.g., token invalid or email not registered in system)",
    //     content: new OA\JsonContent(
    //         properties: [
    //             new OA\Property(property: "message", type: "string", example: "This Google account is not registered."),
    //             new OA\Property(
    //                 property: "errors",
    //                 type: "object",
    //                 properties: [
    //                     new OA\Property(
    //                         property: "email",
    //                         type: "array",
    //                         items: new OA\Items(type: "string", example: "This Google account is not registered.")
    //                     )
    //                 ]
    //             )
    //         ]
    //     )
    // )]
    // public function googleLogin(Request $request): JsonResponse
    // {
    //     $request->headers->set('Accept', 'application/json');
    //
    //     $validated = $request->validate([
    //         'accessToken' => ['required', 'string'],
    //     ]);
    //
    //     try {
    //         $googleResponse = Http::withToken($validated['accessToken'])
    //             ->get('https://www.googleapis.com/oauth2/v3/userinfo');
    //
    //         if (! $googleResponse->successful()) {
    //             throw ValidationException::withMessages([
    //                 'accessToken' => ['Invalid Google token.'],
    //             ]);
    //         }
    //
    //         $payload = $googleResponse->json();
    //         $email = $payload['email'] ?? null;
    //
    //         if (! $email) {
    //             throw ValidationException::withMessages([
    //                 'email' => ['Could not retrieve email from Google.'],
    //             ]);
    //         }
    //
    //         $user = User::query()->where('Email', $email)->first();
    //
    //         if (! $user) {
    //             throw ValidationException::withMessages([
    //                 'email' => ['This Google account is not registered.'],
    //             ]);
    //         }
    //
    //         $token = Str::random(60);
    //
    //         return response()->json([
    //             'token' => $token,
    //             'user' => [
    //                 'id' => $user->UserID,
    //                 'name' => $user->Name,
    //                 'email' => $user->Email,
    //                 'role' => $user->Role,
    //             ],
    //         ]);
    //     } catch (ValidationException $e) {
    //         throw $e;
    //     } catch (\Exception $e) {
    //         throw ValidationException::withMessages([
    //             'accessToken' => ['Google authentication failed: ' . $e->getMessage()],
    //         ]);
    //     }
    // }
}
