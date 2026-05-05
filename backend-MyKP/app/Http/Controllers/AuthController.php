<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\GoogleTokenVerifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(
        private readonly GoogleTokenVerifier $googleTokenVerifier,
    ) {
    }

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
        $data = $request->validate([
            'id_token' => ['required', 'string'],
        ]);

        $payload = $this->googleTokenVerifier->verify($data['id_token']);

        if (! $payload || empty($payload['email'])) {
            return response()->json([
                'message' => 'Invalid Google token.',
            ], 401);
        }

        $user = User::query()->where('Email', $payload['email'])->first();

        if (! $user) {
            return response()->json([
                'message' => 'This Google account is not registered in MyKP.',
            ], 403);
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
}
