<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\KP_Progress;
use App\Models\Participation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoStudentProgressSeeder extends Seeder
{
    /**
     * Demo fixture for one student (eoctaviand): register them for the seeded
     * activities so the Participation History screen is populated, and let
     * their KP totals fall out of those participations — exactly the way
     * ParticipationController::register would credit them in the live app.
     *
     * Nothing is hand-set, so every KP point on the profile traces back to a
     * specific activity visible in the history. One activity (the first) is
     * left un-registered so the live register flow still has something to act
     * on.
     *
     * Runs after KPProgressSeeder, which creates the baseline (all-zero) rows
     * this credits against.
     */
    public function run(): void
    {
        $student = User::query()
            ->where('Email', 'eoctaviand@student.ciputra.ac.id')
            ->first();

        if (! $student) {
            return;
        }

        // Clean slate so every point below is traceable to a participation.
        KP_Progress::query()
            ->where('user_id', $student->UserID)
            ->update(['kp_current_amount' => 0, 'kp_status' => 'On Progress']);

        $activities = Activity::query()->orderBy('ActivityID')->get();
        $skipActivityId = $activities->first()?->ActivityID;

        foreach ($activities as $activity) {
            if ($activity->ActivityID === $skipActivityId) {
                continue;
            }

            Participation::query()->firstOrCreate(
                [
                    'user_id'     => $student->UserID,
                    'activity_id' => $activity->ActivityID,
                ],
                [
                    'kp_category' => $activity->kp_category,
                    'kp_amount'   => (int) $activity->kp_amount,
                    'status'      => 'Completed',
                ]
            );

            // Mirror ParticipationController::register — credit the matching
            // KP_Progress category by exactly the activity's kp_amount.
            $progress = KP_Progress::query()
                ->where('user_id', $student->UserID)
                ->where('kp_category', $activity->kp_category)
                ->first();

            if ($progress) {
                $progress->kp_current_amount = (int) $progress->kp_current_amount + (int) $activity->kp_amount;
                $progress->kp_status = ($progress->kp_amount_requirement > 0
                    && $progress->kp_current_amount >= $progress->kp_amount_requirement)
                    ? 'Completed'
                    : 'On Progress';
                $progress->save();
            }
        }
    }
}
