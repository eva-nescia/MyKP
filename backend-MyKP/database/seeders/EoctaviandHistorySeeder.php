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
    public function run(): void
    {
        $student = User::query()->where('Email', 'eoctaviand@student.ciputra.ac.id')->first();
        $owner   = User::query()->where('Email', 'studentcouncil@ciputra.ac.id')->first();

        if (! $student || ! $owner) {
            $this->command?->warn('EoctaviandHistorySeeder skipped: required users not found.');
            return;
        }

        // [category, requirement, kpAmount, status, dummy activity name, poster]
        // 'Completed' rows credit their kpAmount to kp_progress; 'On Progress'
        // rows show up in the history feed with their nominal KP but are NOT
        // credited (mirrors a registered-but-not-yet-awarded activity), so the
        // category bar stays at 0 for them.
        // Posters are the image1-9 placeholders dropped in public/images/; the
        // three most generic (1/5/8) are reused since there are 12 rows.
        $plan = [
            ['O-Week',                         6,  6,  'Completed',   'Orientation Week 2025',               'images/image1.jpg'],
            ['Upacara',                        4,  4,  'Completed',   'Upacara Bendera HUT RI ke-80',        'images/image5.jpg'],
            ['Camp Mahasiswa (CampJur)',       4,  4,  'Completed',   'Campus Jurusan Camp 2025',            'images/image3.jpg'],
            ['Pra Latihan Dasar Kepemimpinan', 4,  4,  'Completed',   'Pra-LDK Batch 2025',                  'images/image7.jpg'],
            ['Organisasi Kemahasiswaan',       20, 20, 'Completed',   'Kepengurusan UKM Robotika 2025',      'images/image2.png'],
            ['Mentoring',                      15, 15, 'Completed',   'Mentoring Mahasiswa Baru 2025',       'images/image6.jpg'],
            ['Talkshow Wajib BMA',             6,  6,  'Completed',   'Talkshow Wajib BMA: Career Readiness','images/image8.jpg'],
            ['Kepanitiaan',                    10, 10, 'Completed',   'Panitia Dies Natalis UC Makassar',    'images/image10.png'],
            ['Lain-lain',                      15, 15, 'Completed',   'Webinar Pengembangan Diri',           'images/image11.jpg'],
            // In-progress: registered but KP not yet awarded, so uncredited.
            ['Kompetisi',                      2,  2,  'On Progress', 'Hackathon Nasional 2025',             'images/image4.jpg'],
            ['Pengabdian Masyarakat',          8,  8,  'On Progress', 'Bakti Sosial Desa Binaan',            'images/image9.jpg'],
            ['Penelitian',                     6,  6,  'On Progress', 'Publikasi PKM 2025',                  'images/image12.jpg'],
        ];

        foreach ($plan as $i => [$category, $requirement, $kpAmount, $status, $activityName, $poster]) {
            // On-Progress participations have not been awarded yet, so they
            // contribute 0 to the KP total; completed ones credit in full.
            $credited = $status === 'Completed' ? $kpAmount : 0;

            // Past date, spread weekly so the history feed reads chronologically.
            $eventDate = now()->subWeeks($i + 1);

            $activity = Activity::factory()->create([
                'user_id'                    => $owner->UserID,
                'name'                       => $activityName,
                'kp_category'                => $category,
                'kp_amount'                  => $kpAmount,
                'eligible_generation'        => 'Gen 3 - 5',
                'eligible_study_program'     => 'All Prodi',
                'date'                       => $eventDate->toDateString(),
                'start_time'                 => '09:00:00',
                'end_time'                   => '12:00:00',
                'location'                   => 'UC Makassar',
                'registration_link'          => 'https://forms.google.com/dummy',
                'registration_deadline_date' => $eventDate->copy()->subDays(3)->toDateString(),
                'registration_deadline_time' => '23:59:00',
                'description'                => 'Dummy activity for demo/testing.',
                'event_poster'               => $poster,
                // Old event: backs participation history but hidden from the
                // browsable activity list and admin "My Activities".
                'archived'                   => true,
            ]);

            // Minimal detail lists so the detail page isn't blank if tapped.
            ActivityRequirement::create(['activity_id' => $activity->ActivityID, 'value' => 'Active UCM Student']);
            ActivityClaimingProcedure::create(['activity_id' => $activity->ActivityID, 'value' => 'Auto input by BMA']);
            ActivityContactPerson::create(['activity_id' => $activity->ActivityID, 'value' => '852-0000-0000 - Panitia']);

            // Record eoctaviand's participation. kp_amount shows the activity's
            // nominal worth in history regardless of status.
            Participation::create([
                'user_id'     => $student->UserID,
                'activity_id' => $activity->ActivityID,
                'kp_category' => $category,
                'kp_amount'   => $kpAmount,
                'status'      => $status,
            ]);

            // Bring the kp_progress row in line with what was actually awarded.
            KP_Progress::query()->updateOrCreate(
                ['user_id' => $student->UserID, 'kp_category' => $category],
                [
                    'kp_current_amount'     => $credited,
                    'kp_amount_requirement' => $requirement,
                    'kp_status'             => $credited >= $requirement ? 'Completed' : 'On Progress',
                ]
            );
        }
    }
}
