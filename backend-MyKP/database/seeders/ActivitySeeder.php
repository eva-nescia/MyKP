<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Activity::factory()->create([
            'name' => 'Seminar Bela Negara & Anti Narkoba 2026',
            'kp_category' => 'Talkshow Wajib BMA',
            'kp_amount' => 6,
            'eligible_generation' => 'All Gen',
            'eligible_study_program' => 'All Study Program',
            // Converted 29/11/2025 to standard DB date format
            'date' => '2025-11-29', 
            'time' => '07:30 - FINISHED',
            'location' => 'Auditorium, 7th Floor',
            'registration_link' => 'https://forms.google.com/seminarbma2026',
            // Converted 28/11/2025 to standard DB date format
            'registration_deadline_date' => '2025-11-28',
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
Pernah terpikir nggak, gimana cara jadi mahasiswa berintegritas dan siap menghadapi tantangan bangsa? 🇮🇩🔥

Seminar Anti Narkoba & Bela Negara dengan tema “Generasi Emas Tanpa Narkoba, Kuatkan Jiwa Bela Negara” hadir sebagai ruang buat kamu memahami pentingnya menjaga diri dari bahaya narkoba sekaligus memperkuat karakter bela negara sebagai generasi muda UC Makassar!

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
            'requirements' => <<<'EOT'
• Active UCM Student
EOT,
            'claiming_procedure' => <<<'EOT'
• Auto input by BMA
EOT,
            'contact_person' => <<<'EOT'
• 081234567890 - Gladys
• 081234567890 - Vivi
EOT,
            'event_poster' => 'poster_seminar_bela_negara.jpg', // Placeholder for the actual image path
        ]);
    }
}