<?php

namespace Database\Seeders;

use App\Models\KP_Progress;
use App\Models\User;
use Illuminate\Database\Seeder;

class KPProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first student to assign this progress to
        $student = User::where('Role', 'student')->first();
        
        if (!$student) {
            return; // Don't run if no student exists
        }

        $progressData = [
            ['kp_category' => 'O-Week', 'kp_current_amount' => 9, 'kp_amount_requirement' => 6, 'kp_status' => 'Completed'],
            ['kp_category' => 'Upacara', 'kp_current_amount' => 0, 'kp_amount_requirement' => 4, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Camp Mahasiswa (CampJur)', 'kp_current_amount' => 4, 'kp_amount_requirement' => 4, 'kp_status' => 'Completed'],
            ['kp_category' => 'Pra Latihan Dasar Kepemimpinan', 'kp_current_amount' => 0, 'kp_amount_requirement' => 4, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Organisasi Kemahasiswaan', 'kp_current_amount' => 10, 'kp_amount_requirement' => 20, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Mentoring', 'kp_current_amount' => 0, 'kp_amount_requirement' => 15, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Talkshow (Wajib BMA)', 'kp_current_amount' => 6, 'kp_amount_requirement' => 6, 'kp_status' => 'Completed'],
            ['kp_category' => 'Kompetisi', 'kp_current_amount' => 0, 'kp_amount_requirement' => 2, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Pengabdian Masyarakat', 'kp_current_amount' => 0, 'kp_amount_requirement' => 8, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Penelitian', 'kp_current_amount' => 0, 'kp_amount_requirement' => 6, 'kp_status' => 'On Progress'],
            ['kp_category' => 'Lain-lain', 'kp_current_amount' => 6, 'kp_amount_requirement' => 15, 'kp_status' => 'On Progress'],
        ];

        foreach ($progressData as $data) {
            KP_Progress::create([
                'user_id' => $student->UserID,
                'kp_category' => $data['kp_category'],
                'kp_current_amount' => $data['kp_current_amount'],
                'kp_amount_requirement' => $data['kp_amount_requirement'],
                'kp_status' => $data['kp_status'],
            ]);
        }
    }
}