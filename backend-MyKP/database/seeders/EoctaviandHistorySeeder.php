<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityClaimingProcedure;
use App\Models\ActivityContactPerson;
use App\Models\ActivityRequirement;
use App\Models\KP_Progress;
use App\Models\Participation;
use App\Models\User;
use Illuminate\Database\Seeder;

class EoctaviandHistorySeeder extends Seeder
{
    /**
     * Demo data: make eoctaviand's account look "almost graduated" so the
     * profile (per-category KP bars) and participation-history screens can be
     * tested in a near-complete state.
     *
     * Every KP category is filled to its requirement EXCEPT "Penelitian",
     * which is left partial (3/6 → On Progress) so the UI shows one unfinished
     * bar alongside the completed ones. Total lands at 97/100.
     *
     * These are throwaway dummy activities (placeholder posters) and are
     * intentionally NOT the real seeded activities. Runs after KPProgressSeeder
     * so the kp_progress rows already exist and just need updating.
     */
    private const PLACEHOLDER_POSTER = 'https://placehold.co/600x800?text=Dummy+Activity';

    public function run(): void
    {
        $student = User::query()->where('Email', 'eoctaviand@student.ciputra.ac.id')->first();
        $owner   = User::query()->where('Email', 'studentcouncil@ciputra.ac.id')->first();

        if (! $student || ! $owner) {
            $this->command?->warn('EoctaviandHistorySeeder skipped: required users not found.');
            return;
        }

        // [category, requirement, amount eoctaviand has earned, dummy activity name]
        // current === requirement means the category is Completed; the lone
        // partial row (Penelitian) is the "except one" the user asked for.
        $plan = [
            ['O-Week',                         6,  6,  'Orientation Week 2025'],
            ['Upacara',                        4,  4,  'Upacara Bendera HUT RI ke-80'],
            ['Camp Mahasiswa (CampJur)',       4,  4,  'Campus Jurusan Camp 2025'],
            ['Pra Latihan Dasar Kepemimpinan', 4,  4,  'Pra-LDK Batch 2025'],
            ['Organisasi Kemahasiswaan',       20, 20, 'Kepengurusan UKM Robotika 2025'],
            ['Mentoring',                      15, 15, 'Mentoring Mahasiswa Baru 2025'],
            ['Talkshow Wajib BMA',             6,  6,  'Talkshow Wajib BMA: Career Readiness'],
            ['Kepanitiaan',                    10, 10, 'Panitia Dies Natalis UC Makassar'],
            ['Kompetisi',                      2,  2,  'Hackathon Nasional 2025'],
            ['Pengabdian Masyarakat',          8,  8,  'Bakti Sosial Desa Binaan'],
            ['Penelitian',                     6,  3,  'Publikasi PKM (in progress)'], // the unfinished one
            ['Lain-lain',                      15, 15, 'Webinar Pengembangan Diri'],
        ];

        foreach ($plan as $i => [$category, $requirement, $current, $activityName]) {
            // Past date, spread weekly so the history feed reads chronologically.
            $eventDate = now()->subWeeks($i + 1);

            $activity = Activity::factory()->create([
                'user_id'                    => $owner->UserID,
                'name'                       => $activityName,
                'kp_category'                => $category,
                'kp_amount'                  => $current,
                'eligible_generation'        => 'Gen 3 - 5',
                'eligible_study_program'     => 'All Prodi',
                'date'                       => $eventDate->toDateString(),
                'start_time'                 => '09:00:00',
                'end_time'                   => '12:00:00',
                'location'                   => 'UC Makassar',
                'registration_link'          => 'https://forms.google.com/dummy',
                'registration_deadline_date' => $eventDate->copy()->subDays(3)->toDateString(),
                'registration_deadline_time' => '23:59:00',
                'description'                => 'Dummy activity for demo/testing. Replace poster and details later.',
                'event_poster'               => self::PLACEHOLDER_POSTER,
                // Old event: backs participation history but hidden from the
                // browsable activity list and admin "My Activities".
                'archived'                   => true,
            ]);

            // Minimal detail lists so the detail page isn't blank if tapped.
            ActivityRequirement::create(['activity_id' => $activity->ActivityID, 'value' => 'Active UCM Student']);
            ActivityClaimingProcedure::create(['activity_id' => $activity->ActivityID, 'value' => 'Auto input by BMA']);
            ActivityContactPerson::create(['activity_id' => $activity->ActivityID, 'value' => '852-0000-0000 - Panitia']);

            // Record eoctaviand's participation.
            Participation::create([
                'user_id'     => $student->UserID,
                'activity_id' => $activity->ActivityID,
                'kp_category' => $category,
                'kp_amount'   => $current,
                'status'      => 'Completed',
            ]);

            // Bring the kp_progress row in line with what was "earned".
            KP_Progress::query()->updateOrCreate(
                ['user_id' => $student->UserID, 'kp_category' => $category],
                [
                    'kp_current_amount'     => $current,
                    'kp_amount_requirement' => $requirement,
                    'kp_status'             => $current >= $requirement ? 'Completed' : 'On Progress',
                ]
            );
        }
    }
}
