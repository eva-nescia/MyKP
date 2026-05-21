<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityClaimingProcedure;
use App\Models\ActivityContactPerson;
use App\Models\ActivityRequirement;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUserId = 1;

        $seminar = Activity::factory()->create([
            'user_id' => $adminUserId,
            'name' => 'Seminar Bela Negara & Anti Narkoba 2026',
            'kp_category' => 'Talkshow Wajib BMA',
            'kp_amount' => 6,
            'eligible_generation' => 'All Gen',
            'eligible_study_program' => 'All Prodi',
            'date' => '2026-05-29',
            'start_time' => '07:30:00',
            'end_time' => '09:30:00',
            'location' => 'Auditorium, 7th Floor',
            'registration_link' => 'https://forms.google.com/seminarbma2026',
            'registration_deadline_date' => '2025-11-28',
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
Pernah terpikir nggak, gimana cara jadi mahasiswa berintegritas dan siap menghadapi tantangan bangsa? 🇮🇩🔥

Seminar Anti Narkoba & Bela Negara dengan tema "Generasi Emas Tanpa Narkoba, Kuatkan Jiwa Bela Negara" hadir sebagai ruang buat kamu memahami pentingnya menjaga diri dari bahaya narkoba sekaligus memperkuat karakter bela negara sebagai generasi muda UC Makassar!

Di seminar ini, kamu bakal diajak untuk:
💊 Memahami ancaman narkoba bagi generasi emas,
🛡️ Menumbuhkan semangat bela negara, dan
🌟 Membangun sikap profesional, berintegritas, dan siap berkontribusi bagi masyarakat.

💡 Kenapa kamu harus ikut?
• Pemenuhan KP Talkshow Wajib BMA
• Wawasan kebangsaan & anti narkoba yang aplikatif
• Materi langsung dari pihak BNN & narasumber kredibel
• Bekal karakter untuk dunia kuliah & dunia kerja
EOT,
            'event_poster' => 'images/seminarAntiNarkoba.jpeg',
        ]);

        $this->seedListItems($seminar->ActivityID, [
            'requirements' => ['Active UCM Student'],
            'claiming_procedures' => ['Auto input by BMA'],
            'contact_persons' => ['081234567890 - Gladys', '081234567890 - Vivi'],
        ]);

        // Demo activity with a near deadline so the bookmark-reminder flow
        // (3 / 2 / 1 days before registration_deadline_date) is visible the
        // moment a student bookmarks it. Deadline is computed as "tomorrow"
        // at seed time so the demo stays relevant on re-seeds.
        $panitia = Activity::factory()->create([
            'user_id' => $adminUserId,
            'name' => 'Panitia Campus Expo EII 2026',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 5,
            'eligible_generation' => 'All Gen',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(14)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
            'location' => 'Main Hall, 1st Floor',
            'registration_link' => 'https://forms.google.com/panitia-expo-eii',
            'registration_deadline_date' => now()->addDays(3)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => 'Become part of the organising committee for Campus Expo EII 2026. Help plan, run, and coordinate booth sessions across the day.',
            'event_poster' => 'images/panitia_expo_eii.jpeg',
        ]);

        $this->seedListItems($panitia->ActivityID, [
            'requirements' => ['Active UCM Student', 'Available on event day (full day)'],
            'claiming_procedures' => ['KP awarded after the event by the organising team'],
            'contact_persons' => ['081234567891 - Andre'],
        ]);
    }

    private function seedListItems(int $activityId, array $items): void
    {
        foreach ($items['requirements'] ?? [] as $value) {
            ActivityRequirement::create(['activity_id' => $activityId, 'value' => $value]);
        }
        foreach ($items['claiming_procedures'] ?? [] as $value) {
            ActivityClaimingProcedure::create(['activity_id' => $activityId, 'value' => $value]);
        }
        foreach ($items['contact_persons'] ?? [] as $value) {
            ActivityContactPerson::create(['activity_id' => $activityId, 'value' => $value]);
        }
    }
}
