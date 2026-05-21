<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA; // <-- Must add this import!

#[OA\Info(
    version: "1.0.0",
    title: "MyKP API Documentation",
    description: "API documentation for the MyKP backend"
)]
#[OA\SecurityScheme(
    securityScheme: "sanctum",
    type: "http",
    scheme: "bearer",
    bearerFormat: "string",
    description: "Laravel Sanctum API Token"
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
            // Only allow @ciputra.ac.id and @student.ciputra.ac.id addresses.
            // Regex is case-insensitive and anchored to the end of the string.
            'email' => ['required', 'string', 'regex:/@(student\.)?ciputra\.ac\.id$/i'],
            'password' => ['required', 'string'],
        ], [
            'email.regex' => 'Only @ciputra.ac.id or @student.ciputra.ac.id emails are allowed.',
        ]);

        $user = User::query()->where('Email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->Password)) {
            throw ValidationException::withMessages([
                'email' => ['Email or password is incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

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

    #[OA\Post(
        path: "/api/logout",
        summary: "Revoke the current Sanctum access token (only this device's token, other sessions stay valid)",
        tags: ["Authentication"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Logged out",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "logged_out", type: "boolean", example: true),
            ]
        )
    )]
    #[OA\Response(response: 401, description: "Unauthorized — no valid token in Authorization header")]
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'logged_out' => true,
        ]);
    }

    #[OA\Post(
        path: "/api/login/google",
        summary: "Login with Google OAuth Access Token",
        tags: ["Authentication"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["accessToken"],
            properties: [
                new OA\Property(
                    property: "accessToken",
                    type: "string",
                    description: "Google OAuth access token from the frontend SDK",
                    example: "ya29.a0AfB_byCdefGHIJKlmnop..."
                )
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Successful Google login (same shape as /login)",
        content: new OA\JsonContent(
            type: "object",
            properties: [
                new OA\Property(property: "token", type: "string", example: "1|abcdef1234567890..."),
                new OA\Property(
                    property: "user",
                    type: "object",
                    properties: [
                        new OA\Property(property: "id", type: "integer", example: 2),
                        new OA\Property(property: "name", type: "string", example: "KenStudent"),
                        new OA\Property(property: "email", type: "string", format: "email", example: "atubagus@student.ciputra.ac.id"),
                        new OA\Property(property: "role", type: "string", example: "student"),
                    ]
                ),
            ]
        )
    )]
    #[OA\Response(
        response: 422,
        description: "Validation error (invalid token, wrong domain, or email not registered)",
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: "message", type: "string", example: "This Google account is not registered."),
                new OA\Property(
                    property: "errors",
                    type: "object",
                    properties: [
                        new OA\Property(property: "email", type: "array", items: new OA\Items(type: "string")),
                    ]
                ),
            ]
        )
    )]
    public function googleLogin(Request $request): JsonResponse
    {
        $request->headers->set('Accept', 'application/json');

        $validated = $request->validate([
            'accessToken' => ['required', 'string'],
        ]);

        try {
            $googleResponse = Http::withToken($validated['accessToken'])
                ->get('https://www.googleapis.com/oauth2/v3/userinfo');

            if (! $googleResponse->successful()) {
                throw ValidationException::withMessages([
                    'accessToken' => ['Invalid Google token.'],
                ]);
            }

            $payload = $googleResponse->json();
            $email = $payload['email'] ?? null;

            if (! $email) {
                throw ValidationException::withMessages([
                    'email' => ['Could not retrieve email from Google.'],
                ]);
            }

            // Same domain gate as the password login flow.
            if (! preg_match('/@(student\.)?ciputra\.ac\.id$/i', $email)) {
                throw ValidationException::withMessages([
                    'email' => ['Only @ciputra.ac.id or @student.ciputra.ac.id emails are allowed.'],
                ]);
            }

            $user = User::query()->where('Email', $email)->first();

            if (! $user) {
                throw ValidationException::withMessages([
                    'email' => ['This Google account is not registered.'],
                ]);
            }

            // Issue a real Sanctum token so the frontend can authenticate
            // subsequent requests. The previous implementation used
            // Str::random(60), which produces a string Sanctum has no record
            // of — every authenticated call would have come back 401.
            $token = $user->createToken('google_token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => [
                    'id' => $user->UserID,
                    'name' => $user->Name,
                    'email' => $user->Email,
                    'role' => $user->Role,
                ],
            ]);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'accessToken' => ['Google authentication failed: ' . $e->getMessage()],
            ]);
        }
    }
}
