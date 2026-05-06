<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
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

    public function googleLogin(Request $request): JsonResponse
    {
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

            $user = User::query()->where('Email', $email)->first();

            if (! $user) {
                throw ValidationException::withMessages([
                    'email' => ['This Google account is not registered.'],
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
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'accessToken' => ['Google authentication failed: ' . $e->getMessage()],
            ]);
        }
    }
}
