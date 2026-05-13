<?php

namespace Database\Seeders;

use App\Models\KP_Progress;
use App\Models\User;
use Illuminate\Database\Seeder;

class KPProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Per-student template — each student gets one row per category.
     * kp_status is derived from amounts so seeded data is always self-consistent.
     */
    public function run(): void
    {
        $template = [
            ['kp_category' => 'O-Week',                         'kp_current_amount' => 9,  'kp_amount_requirement' => 6],
            ['kp_category' => 'Upacara',                        'kp_current_amount' => 4,  'kp_amount_requirement' => 4],
            ['kp_category' => 'Camp Mahasiswa (CampJur)',       'kp_current_amount' => 4,  'kp_amount_requirement' => 4],
            ['kp_category' => 'Pra Latihan Dasar Kepemimpinan', 'kp_current_amount' => 0,  'kp_amount_requirement' => 4],
            ['kp_category' => 'Organisasi Kemahasiswaan',       'kp_current_amount' => 10, 'kp_amount_requirement' => 20],
            ['kp_category' => 'Mentoring',                      'kp_current_amount' => 0,  'kp_amount_requirement' => 15],
            ['kp_category' => 'Talkshow (Wajib BMA)',           'kp_current_amount' => 6,  'kp_amount_requirement' => 6],
            ['kp_category' => 'Kepanitiaan',                    'kp_current_amount' => 0,  'kp_amount_requirement' => 10],
            ['kp_category' => 'Kompetisi',                      'kp_current_amount' => 0,  'kp_amount_requirement' => 2],
            ['kp_category' => 'Pengabdian Masyarakat',          'kp_current_amount' => 0,  'kp_amount_requirement' => 8],
            ['kp_category' => 'Penelitian',                     'kp_current_amount' => 0,  'kp_amount_requirement' => 6],
            ['kp_category' => 'Lain-lain',                      'kp_current_amount' => 6,  'kp_amount_requirement' => 15],
        ];

        $students = User::query()->where('Role', 'student')->get();

        foreach ($students as $student) {
            foreach ($template as $row) {
                $status = $row['kp_current_amount'] >= $row['kp_amount_requirement']
                    ? 'Completed'
                    : 'On Progress';

                KP_Progress::create([
                    'user_id'               => $student->UserID,
                    'kp_category'           => $row['kp_category'],
                    'kp_current_amount'     => $row['kp_current_amount'],
                    'kp_amount_requirement' => $row['kp_amount_requirement'],
                    'kp_status'             => $status,
                ]);
            }
        }

        // Calculate the total earned amount for the student
        $totalEarned = KP_Progress::where('user_id', $student->UserID)->sum('kp_current_amount');
    }
}
