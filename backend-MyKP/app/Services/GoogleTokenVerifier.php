<?php

namespace App\Services;

// ==========================================================
// GOOGLE TOKEN VERIFIER — temporarily disabled. Re-enable later.
// ==========================================================
// use Google_Client;

class GoogleTokenVerifier
{
    /**
     * @return array<string, mixed>|false
     */
    // public function verify(string $idToken): array|false
    // {
    //     $client = new Google_Client([
    //         'client_id' => config('services.google.client_id'),
    //     ]);
    //
    //     return $client->verifyIdToken($idToken);
    // }
}
