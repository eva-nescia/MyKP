<?php

namespace Tests\Feature;

use App\Models\User;
// use App\Services\GoogleTokenVerifier; // unused while Google login is disabled
use Illuminate\Foundation\Testing\RefreshDatabase;
// use Mockery\MockInterface; // unused while Google login is disabled
use Tests\TestCase;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_and_receive_frontend_auth_shape(): void
    {
        User::factory()->create([
            'Name' => 'Student User',
            'NIM' => '1234567890',
            'Email' => 'student@mykp.test',
            'Password' => 'password',
            'Role' => 'student',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'student@mykp.test',
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'token',
                'user' => ['id', 'name', 'email', 'role'],
            ])
            ->assertJsonPath('user.role', 'student');
    }

    public function test_invalid_login_is_rejected(): void
    {
        User::factory()->create([
            'Email' => 'student@mykp.test',
            'Password' => 'password',
        ]);

        $this->postJson('/api/login', [
            'email' => 'student@mykp.test',
            'password' => 'wrong-password',
        ])->assertUnprocessable();
    }

    // ==========================================================
    // GOOGLE LOGIN TESTS — temporarily disabled. Re-enable later.
    // ==========================================================
    // public function test_user_can_login_with_google_when_email_is_registered(): void
    // {
    //     User::factory()->create([
    //         'Name' => 'Student User',
    //         'NIM' => '1234567890',
    //         'Email' => 'student@mykp.test',
    //         'Role' => 'student',
    //     ]);
    //
    //     $this->mock(GoogleTokenVerifier::class, function (MockInterface $mock) {
    //         $mock
    //             ->shouldReceive('verify')
    //             ->once()
    //             ->with('valid-google-id-token')
    //             ->andReturn([
    //                 'email' => 'student@mykp.test',
    //                 'sub' => 'google-user-id',
    //             ]);
    //     });
    //
    //     $response = $this->postJson('/api/google-login', [
    //         'id_token' => 'valid-google-id-token',
    //     ]);
    //
    //     $response
    //         ->assertOk()
    //         ->assertJsonStructure([
    //             'token',
    //             'user' => ['id', 'name', 'email', 'role'],
    //         ])
    //         ->assertJsonPath('user.email', 'student@mykp.test')
    //         ->assertJsonPath('user.role', 'student');
    // }
    //
    // public function test_google_login_rejects_unregistered_email(): void
    // {
    //     $this->mock(GoogleTokenVerifier::class, function (MockInterface $mock) {
    //         $mock
    //             ->shouldReceive('verify')
    //             ->once()
    //             ->with('valid-google-id-token')
    //             ->andReturn([
    //                 'email' => 'unknown@mykp.test',
    //                 'sub' => 'google-user-id',
    //             ]);
    //     });
    //
    //     $this
    //         ->postJson('/api/google-login', [
    //             'id_token' => 'valid-google-id-token',
    //         ])
    //         ->assertForbidden();
    // }
}
