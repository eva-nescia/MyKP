<?php

namespace Tests\Feature;

use App\Models\KP_Progress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_endpoint_returns_user_and_kp_summary(): void
    {
        $user = User::factory()->create([
            'Name' => 'Test Student',
            'NIM' => '5555555555',
            'Email' => 'profile.test@mykp.test',
            'Role' => 'student',
            'ProfilePicture' => 'https://example.com/avatar.png',
        ]);

        // 2 categories completed, 1 in progress -> 3 total
        KP_Progress::create([
            'user_id' => $user->UserID,
            'kp_category' => 'O-Week',
            'kp_current_amount' => 9,
            'kp_amount_requirement' => 6,
            'kp_status' => 'Completed',
        ]);
        KP_Progress::create([
            'user_id' => $user->UserID,
            'kp_category' => 'Talkshow (Wajib BMA)',
            'kp_current_amount' => 6,
            'kp_amount_requirement' => 6,
            'kp_status' => 'Completed',
        ]);
        KP_Progress::create([
            'user_id' => $user->UserID,
            'kp_category' => 'Mentoring',
            'kp_current_amount' => 5,
            'kp_amount_requirement' => 10,
            'kp_status' => 'On Progress',
        ]);

        $response = $this->getJson("/api/profile/{$user->UserID}");

        $response
            ->assertOk()
            ->assertJsonStructure([
                'user' => ['id', 'name', 'nim', 'email', 'role', 'profile_picture'],
                'kp_categories' => [
                    ['id', 'title', 'current', 'target', 'status', 'percentage'],
                ],
                'kp_summary' => [
                    'completed',
                    'in_progress',
                    'total_current',
                    'total_target',
                    'overall_percentage',
                ],
            ])
            ->assertJsonPath('user.email', 'profile.test@mykp.test')
            ->assertJsonPath('user.profile_picture', 'https://example.com/avatar.png')
            ->assertJsonPath('kp_summary.completed', 2)
            ->assertJsonPath('kp_summary.in_progress', 1)
            // 9 capped at target 6 contributes 6, plus 6 + 5 = 17 current; targets 6+6+10=22
            // Wait: spec sums raw current (35 example earlier). Let's match: total_current sums the raw current values.
            ->assertJsonPath('kp_summary.total_current', 9 + 6 + 5)
            ->assertJsonPath('kp_summary.total_target', 6 + 6 + 10);
    }

    public function test_profile_endpoint_returns_404_for_unknown_user(): void
    {
        $this->getJson('/api/profile/9999')
            ->assertNotFound()
            ->assertJsonPath('message', 'User not found.');
    }

    public function test_category_status_is_derived_from_amounts(): void
    {
        $user = User::factory()->create([
            'Email' => 'derive.status@mykp.test',
            'Role' => 'student',
        ]);

        // Stored as "On Progress" but current >= target should be reported "Completed".
        KP_Progress::create([
            'user_id' => $user->UserID,
            'kp_category' => 'Camp Mahasiswa',
            'kp_current_amount' => 4,
            'kp_amount_requirement' => 4,
            'kp_status' => 'On Progress',
        ]);

        $response = $this->getJson("/api/profile/{$user->UserID}");

        $response
            ->assertOk()
            ->assertJsonPath('kp_categories.0.status', 'Completed')
            ->assertJsonPath('kp_categories.0.percentage', 100);
    }

    public function test_percentage_caps_at_100_when_current_exceeds_target(): void
    {
        $user = User::factory()->create([
            'Email' => 'over.target@mykp.test',
            'Role' => 'student',
        ]);

        KP_Progress::create([
            'user_id' => $user->UserID,
            'kp_category' => 'O-Week',
            'kp_current_amount' => 9,
            'kp_amount_requirement' => 6,
            'kp_status' => 'Completed',
        ]);

        $this->getJson("/api/profile/{$user->UserID}")
            ->assertOk()
            ->assertJsonPath('kp_categories.0.percentage', 100);
    }
}
