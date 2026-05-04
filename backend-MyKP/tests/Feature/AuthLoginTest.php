<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
}
