<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityClaimingProcedure;
use App\Models\ActivityContactPerson;
use App\Models\ActivityRequirement;
use App\Models\User;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Ten activities, each backed by a real poster in public/images/. Dates
     * are computed relative to now() so the demo stays current on every
     * re-seed. Three activities are timed so the bookmark-reminder feed
     * (3 / 2 / 1 days before registration_deadline_date) is exercised on
     * seed day: Doa Lintas Iman fires a 2-day reminder, Panitia Expo EII
     * fires a 3-day reminder, and Brand Expo fires a 1-day reminder.
     */
    public function run(): void
    {
        // Map each activity to the admin who actually organises it. Look ups
        // are by email so the seeder is order-independent — adding or removing
        // organisers in DatabaseSeeder won't shift IDs and break the wiring.
        $admins = User::query()
            ->whereIn('Email', [
                'studentcouncil@ciputra.ac.id',
                'fdu@ciputra.ac.id',
                'empowercare@ciputra.ac.id',
                'diktisaintek@ciputra.ac.id',
                'msu@ciputra.ac.id',
                'oweek2026@ciputra.ac.id',
                'reflektif@ciputra.ac.id',
                'oyc@ciputra.ac.id',
                'expoeii@ciputra.ac.id',
            ])
            ->pluck('UserID', 'Email');

        $studentCouncil = $admins['studentcouncil@ciputra.ac.id'];
        $fdu            = $admins['fdu@ciputra.ac.id'];
        $empowerCareAdm = $admins['empowercare@ciputra.ac.id'];
        $dikti          = $admins['diktisaintek@ciputra.ac.id'];
        $msu            = $admins['msu@ciputra.ac.id'];
        $oWeekCommittee = $admins['oweek2026@ciputra.ac.id'];
        $reflektifAdm   = $admins['reflektif@ciputra.ac.id'];
        $oyc            = $admins['oyc@ciputra.ac.id'];
        $eiiCommittee   = $admins['expoeii@ciputra.ac.id'];

        // 1. Seminar Bela Negara & Anti Narkoba 2026
        $seminarBelaNegara = Activity::factory()->create([
            'user_id' => $studentCouncil,
            'name' => 'Seminar Bela Negara & Anti Narkoba 2026',
            'kp_category' => 'Talkshow Wajib BMA',
            'kp_amount' => 6,
            'eligible_generation' => 'Gen 3 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(21)->toDateString(),
            'start_time' => '07:30:00',
            'end_time' => '09:30:00',
            'location' => 'Dian Auditorium, UC Makassar',
            'registration_link' => 'https://forms.google.com/seminarbma2026',
            'registration_deadline_date' => now()->addDays(18)->toDateString(),
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

        $this->seedListItems($seminarBelaNegara->ActivityID, [
            'requirements' => ['Active UCM Student'],
            'claiming_procedures' => ['Auto input by BMA after attendance is recorded'],
            'contact_persons' => ['852-1234-5678 (BMA Liaison)'],
        ]);

        // 2. Doa Lintas Iman — fires a 2-day reminder on seed day
        $doaLintasIman = Activity::factory()->create([
            'user_id' => $fdu,
            'name' => 'Doa Lintas Iman: Faith in Diversity, Strength in Unity',
            'kp_category' => 'Talkshow Wajib BMA',
            'kp_amount' => 4,
            'eligible_generation' => 'Gen 3 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(4)->toDateString(),
            'start_time' => '16:00:00',
            'end_time' => '18:00:00',
            'location' => 'Dian Auditorium, UC Makassar',
            'registration_link' => 'https://forms.google.com/doalintasiman2026',
            'registration_deadline_date' => now()->addDays(2)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
Faith in Diversity, Strength in Unity 🙏✨

Doa Lintas Iman adalah momen kebersamaan seluruh civitas UC Makassar untuk merayakan keberagaman keyakinan sebagai kekuatan pemersatu. Lewat doa dan refleksi bersama dari berbagai tradisi iman, kita diajak untuk lebih saling menghargai dan menumbuhkan rasa toleransi di lingkungan kampus.

📌 Hal yang akan kamu dapatkan:
• Pengalaman berdoa bersama lintas iman
• Refleksi tentang toleransi & kebhinekaan
• Pemenuhan KP Talkshow Wajib BMA
• Sertifikat kehadiran (opsional)

🔔 Wajib untuk Gen 5, tetapi terbuka untuk semua angkatan UC Makassar.
EOT,
            'event_poster' => 'images/doa_lintas_iman.jpeg',
        ]);

        $this->seedListItems($doaLintasIman->ActivityID, [
            'requirements' => [
                'Active UCM Student',
                'Wajib hadir untuk mahasiswa Gen 5',
                'Berpakaian rapi dan sopan',
            ],
            'claiming_procedures' => ['Auto input by BMA after attendance is recorded'],
            'contact_persons' => ['856-7890-1234 (Audric)'],
        ]);

        // 3. Open Donasi Empower & Care
        $empowerCare = Activity::factory()->create([
            'user_id' => $empowerCareAdm,
            'name' => 'Open Donasi: Empower & Care',
            'kp_category' => 'Pengabdian Masyarakat',
            'kp_amount' => 5,
            'eligible_generation' => 'Gen 3 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(14)->toDateString(),
            'start_time' => '00:00:00',
            'end_time' => '23:59:00',
            'location' => 'Online (Allo Bank Transfer) & Drop-off Point UC Makassar',
            'registration_link' => 'https://forms.google.com/empowercare2026',
            'registration_deadline_date' => now()->addDays(7)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN DONASI EMPOWER & CARE 💛
Gerakan Sosial Berbasis Kolaborasi

Kami mengajak Anda untuk turut berpartisipasi dalam kegiatan Bakti Sosial yang akan disalurkan ke panti asuhan, panti jompo, dan sekolah yang membutuhkan. Setiap donasi yang Anda berikan akan menjadi harapan dan kebahagiaan bagi mereka.

📍 Salurkan donasi Anda melalui:
• Allo Bank 081242058577 a.n. Kayleen Lovenia Sunaryono
• Atau scan QR code "Form Donasi" pada poster

🎯 Tujuan kegiatan:
• Membantu komunitas yang kurang mampu di sekitar Makassar
• Membangun budaya kolaborasi & empati antar mahasiswa
• Pemenuhan KP Pengabdian Masyarakat (request mandiri via CIS)
EOT,
            'event_poster' => 'images/open_donasi_empower_care.jpeg',
        ]);

        $this->seedListItems($empowerCare->ActivityID, [
            'requirements' => [
                'Active UCM Student',
                'Donasi minimal sesuai ketentuan panitia',
                'Simpan bukti transfer untuk klaim KP',
            ],
            'claiming_procedures' => [
                'Kumpulkan bukti transfer / dokumentasi penyerahan donasi',
                'Submit request KP via CIS dengan kategori Pengabdian Masyarakat',
                'Tunggu verifikasi BMA',
            ],
            'contact_persons' => ['856-9603-0800 (Andrew)'],
        ]);

        // 4. Oprec Presiden & Wakil Presiden Student Council 26/27
        $oprecSC = Activity::factory()->create([
            'user_id' => $studentCouncil,
            'name' => 'Open Recruitment Presiden & Wakil Presiden Student Council 26/27',
            'kp_category' => 'Organisasi Kemahasiswaan',
            'kp_amount' => 20,
            'eligible_generation' => 'Gen 3 - 4',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(28)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '15:00:00',
            'location' => 'Student Council Office, UC Makassar',
            'registration_link' => 'https://forms.google.com/sc-president-26-27',
            'registration_deadline_date' => now()->addDays(12)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT 🦅
Presiden & Wakil Presiden Student Council 26/27
Student Council of UC Makassar - Delphinus

Saatnya kamu memimpin dan menjadi bagian dari perubahan! Student Council UC Makassar membuka kesempatan bagi mahasiswa terbaik untuk maju sebagai pasangan calon Presiden & Wakil Presiden periode 26/27.

🗓️ TIMELINE PENDAFTARAN:
• Pendaftaran: 6 - 20 April 2026
• Seleksi Berkas: 21 - 23 April 2026
• Pengumuman Hasil Seleksi: 24 April 2026

Daftarkan diri kamu sekarang dan jadi bagian dari pemimpin masa depan UC Makassar! 🚀
EOT,
            'event_poster' => 'images/oprec_sc.jpeg',
        ]);

        $this->seedListItems($oprecSC->ActivityID, [
            'requirements' => [
                'Mahasiswa aktif STIE Ciputra Makassar (tidak cuti/lalai registrasi)',
                'Presiden: Angkatan 2023 | Wakil: Angkatan 2023/2024',
                'Memiliki integritas & kepribadian yang baik',
                'Tidak merangkap jabatan dalam kepengurusan suatu organisasi',
                'Pengalaman organisasi minimal 1 tahun',
                'IPK Minimal 3.00',
                'Tidak pernah melanggar kode etik kampus',
            ],
            'claiming_procedures' => [
                'KP diberikan otomatis oleh BMA setelah masa jabatan berjalan',
                'Pastikan terdaftar sebagai pengurus aktif Student Council',
            ],
            'contact_persons' => [
                '813-9264-0842 (Amirul)',
                '851-0661-2388 (Evelyn)',
            ],
        ]);

        // 5. Panitia Campus Expo EII 2026 — fires a 3-day reminder on seed day
        $panitiaExpoEII = Activity::factory()->create([
            'user_id' => $dikti,
            'name' => 'Open Recruitment Panitia Campus Expo EII 2026',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 5,
            'eligible_generation' => 'Gen 4 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(14)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
            'location' => 'Main Hall, 1st Floor UC Makassar',
            'registration_link' => 'https://forms.google.com/panitia-expo-eii',
            'registration_deadline_date' => now()->addDays(3)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT 🍩🥐
Panitia Campus Expo EII 2026
Dikti Saintek Berdampak

Saatnya jadi bagian dari Expo Entrepreneurial Innovations! Kami membuka kesempatan bagi mahasiswa UC Makassar untuk bergabung sebagai panitia dan mengasah skill berorganisasi sambil mendapatkan pengalaman event berskala kampus.

📋 LIST OF DIVISIONS:
• Event
• Inventory
• Tenant
• Media
• Secure

📅 Periode Pendaftaran: 19 April - 25 April 2026

Daftarkan diri kamu dan jadilah bagian dari kesuksesan acara! ✨
EOT,
            'event_poster' => 'images/panitia_expo_eii.jpeg',
        ]);

        $this->seedListItems($panitiaExpoEII->ActivityID, [
            'requirements' => [
                'Mahasiswa aktif UC Makassar angkatan 2024/2025',
                'Bertanggung jawab atas pilihan divisi',
                'Memiliki komitmen dan siap berkontribusi',
                'Mampu bekerja sama dalam tim',
                'Mengisi form dengan data yang jujur & lengkap',
                'Seleksi tanpa wawancara (berdasarkan CV & komitmen)',
                'Khusus divisi media wajib melampirkan portofolio',
            ],
            'claiming_procedures' => [
                'KP awarded after the event by the organising team',
                'Pastikan nama terdaftar pada susunan panitia',
            ],
            'contact_persons' => ['899-0326-8881 (Carol)'],
        ]);

        // 6. Oprec Committee Flamians Cup 4.0
        $flamiansCup = Activity::factory()->create([
            'user_id' => $msu,
            'name' => 'Open Recruitment Committee Flamians Cup 4.0',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 8,
            'eligible_generation' => 'Gen 3 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(45)->toDateString(),
            'start_time' => '08:00:00',
            'end_time' => '18:00:00',
            'location' => 'Sports Hall, UC Makassar',
            'registration_link' => 'https://forms.google.com/flamianscup4',
            'registration_deadline_date' => now()->addDays(8)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT COMMITTEE 🔥
FLAMIANS CUP 4.0
Management Student Union x Inspire

Bergabunglah menjadi bagian dari turnamen tahunan terbesar Management Student Union! Kami mencari panitia yang siap berkontribusi penuh untuk mensukseskan Flamians Cup 4.0 — turnamen olahraga dan unjuk talenta antar prodi UC Makassar.

📅 TIMELINE:
• Open Registration: 14 Maret 2026
• Close Registration: 29 Maret 2026
• Interview: 31 Maret - 1 April 2026
• Announcement: 3 April 2026

📋 LIST OF DIVISIONS:
• Event
• Inventory
• Food and Beverage
• Public Relation
• Secure and Cleaning
• PDD

🎁 BENEFIT:
• Menambah relasi dan networking
• Menambah pengalaman
• Mendapatkan kredit poin
EOT,
            'event_poster' => 'images/anggota_flamians_cup_4.jpeg',
        ]);

        $this->seedListItems($flamiansCup->ActivityID, [
            'requirements' => [
                'Mahasiswa/i UC aktif angkatan 2023-2025 (semua prodi)',
                'Melampirkan Curriculum Vitae (CV)',
                'Academic Transcript min GPA 3.00 (angkatan 2023-2025)',
                'Melampirkan portfolio (PDD only)',
                'Mampu membagi prioritas akademik dan kepanitiaan',
            ],
            'claiming_procedures' => [
                'KP akan diinput otomatis oleh BMA setelah kegiatan selesai',
                'Pastikan nama terdaftar pada susunan panitia final',
            ],
            'contact_persons' => [
                '812-4329-1544 (Andhini)',
                '812-9126-1064 (Jennifer)',
            ],
        ]);

        // 7. Oprec HOD & Koor O-Week 2026
        $oWeek = Activity::factory()->create([
            'user_id' => $oWeekCommittee,
            'name' => 'Open Recruitment HOD & Koor O-Week 2026',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 10,
            'eligible_generation' => 'Gen 3 - 4',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(90)->toDateString(),
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'location' => 'Campus-wide, UC Makassar',
            'registration_link' => 'https://forms.google.com/oweek2026-hod',
            'registration_deadline_date' => now()->addDays(25)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT 👑
HOD & KOOR O-WEEK 2026

Ingin jadi pemimpin di acara penyambutan mahasiswa baru? O-Week 2026 membuka kesempatan untuk posisi Head of Department (HOD) dan Koordinator lintas divisi!

📋 DIVISIONS:
• HRD Department (Secretary)
• Marketing & Resources Department (Treasurer)
• Food & Nutrition Department (PSG)
• Plan & Concept Department (PNC)
• Publication & Documentation Department (PDD)
• Audio & Multitune Department (AMD)
• Bridge & Hosting Department (BHD)

📅 TIMELINE:
• Open Recruitment: 25 Oktober - 16 November 2025
• Interview: 24 - 27 November 2025
• Announcement: 8 December 2025

Berkontribusi untuk menyambut generasi baru UC Makassar! 🚀
EOT,
            'event_poster' => 'images/recruit_koor_oweek.png',
        ]);

        $this->seedListItems($oWeek->ActivityID, [
            'requirements' => [
                'Mahasiswa aktif UC Makassar angkatan 2023-2024',
                'Pernah menjadi panitia minimal 1 event kampus',
                'Mampu memimpin dan berkoordinasi lintas divisi',
                'Melampirkan CV dan motivation letter',
            ],
            'claiming_procedures' => [
                'KP diberikan otomatis oleh BMA setelah O-Week selesai',
                'Pastikan terdaftar pada susunan HOD/Koor final',
            ],
            'contact_persons' => ['813-1090-6378 (Diana)'],
        ]);

        // 8. Oprec Seminar Reflektif Akhir Tahun
        $seminarReflektif = Activity::factory()->create([
            'user_id' => $reflektifAdm,
            'name' => 'Open Recruitment Panitia Seminar Reflektif Akhir Tahun',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 5,
            'eligible_generation' => 'Gen 4 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(150)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '15:00:00',
            'location' => 'Dian Auditorium, UC Makassar',
            'registration_link' => 'https://forms.google.com/seminar-reflektif-2025',
            'registration_deadline_date' => now()->addDays(10)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT 📣
Panitia Seminar Reflektif Akhir Tahun

Tutup tahun dengan refleksi yang bermakna! Kami membuka kesempatan untuk mahasiswa UC Makassar yang ingin berkontribusi menjadi panitia Seminar Reflektif Akhir Tahun.

📋 DIVISI:
• Event
• Perlengkapan
• Publikasi & Dokumentasi
• Keamanan

📅 TIMELINE:
• Pendaftaran: 8 - 11 November 2025
• Pengumuman: 13 November 2025

🎁 BENEFIT:
• Menambah relasi dan pengalaman baru
• Pengembangan softskill & teamwork
• Sertifikat kepanitiaan
• Kesempatan belajar mengelola event kampus

AYO JOIN!! 🎉
EOT,
            'event_poster' => 'images/recruit_seminar_reflektif_akhir_tahun.png',
        ]);

        $this->seedListItems($seminarReflektif->ActivityID, [
            'requirements' => [
                'Terbuka untuk semua mahasiswa aktif UC Makassar (Gen 4-5)',
                'Mampu membagi waktu antara akademik & kepanitiaan',
                'Melampirkan Curriculum Vitae (CV)',
            ],
            'claiming_procedures' => [
                'KP awarded by BMA after seminar wraps up',
                'Pastikan nama tertera di susunan panitia',
            ],
            'contact_persons' => [
                '852-1565-2431 (Naura)',
                '851-1741-5107 (Ratu)',
            ],
        ]);

        // 9. Oprec HOD & Koor Brand Expo — fires a 1-day reminder on seed day
        $brandExpo = Activity::factory()->create([
            'user_id' => $oyc,
            'name' => 'Open Recruitment HOD & Koor Brand Expo',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 8,
            'eligible_generation' => 'Gen 4',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(120)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
            'location' => 'Main Hall, UC Makassar',
            'registration_link' => 'https://forms.google.com/brand-expo-oprec',
            'registration_deadline_date' => now()->addDays(1)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT ✈️
HOD & Koor Brand Expo
Onyx Youth Community (OYC)

Brand Expo membuka kesempatan untuk mahasiswa yang ingin memimpin sebagai HOD atau Koordinator lintas divisi. Asah leadership-mu lewat event branding terbesar tahun ini!

📋 LIST OF DIVISION:
• Vice President
• Secretary
• Treasurer
• Event
• Inventory
• EBC
• Sponsor
• Tenant
• PDD
• Marketing

📅 TIMELINE:
• Pendaftaran: 10 - 29 Oktober 2025
• Interview: 22 - 25 Oktober 2025
• Pengumuman: 26 Oktober 2025

🎁 BENEFIT:
• Menambah relasi & networking
• Menambah pengalaman
• Mendapatkan kredit poin
EOT,
            'event_poster' => 'images/recruitment_brand_expo.png',
        ]);

        $this->seedListItems($brandExpo->ActivityID, [
            'requirements' => [
                'Mahasiswa/i aktif angkatan 2024 (tidak cuti)',
                'Memiliki pengalaman event minimal 1 kali',
                'Mampu bekerja teamwork dan menghormati deadline',
                'Khusus PDD/Marketing wajib melampirkan portofolio',
            ],
            'claiming_procedures' => [
                'KP diinput otomatis oleh BMA setelah event selesai',
                'Pastikan terdaftar di susunan HOD/Koor final',
            ],
            'contact_persons' => ['821-9520-8675 (Allan)'],
        ]);

        // 10. Oprec Expo Entrepreneurial Innovations
        $expoEI = Activity::factory()->create([
            'user_id' => $eiiCommittee,
            'name' => 'Open Recruitment Expo Entrepreneurial Innovations',
            'kp_category' => 'Kepanitiaan',
            'kp_amount' => 6,
            'eligible_generation' => 'Gen 3 - 5',
            'eligible_study_program' => 'All Prodi',
            'date' => now()->addDays(170)->toDateString(),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
            'location' => 'Main Hall, UC Makassar',
            'registration_link' => 'https://forms.google.com/expo-ei-oprec',
            'registration_deadline_date' => now()->addDays(9)->toDateString(),
            'registration_deadline_time' => '23:59:00',
            'description' => <<<'EOT'
OPEN RECRUITMENT 💡
Expo Entrepreneurial Innovations

Bergabunglah menjadi panitia Expo Entrepreneurial Innovations dan jadilah bagian dari event yang menampilkan inovasi mahasiswa UC Makassar!

📋 DIVISIONS:
• Event
• Perkap
• LO
• PDD
• Keamanan

📅 SCHEDULE:
• Friday, Nov 7-11
• Announcement: 11 November

🎁 BENEFITS:
• Pengalaman mengurus event
• Mengembangkan koneksi
• Peluang mendapat KP1

REGISTER NOW! ⭐
EOT,
            'event_poster' => 'images/recruitment_expo_entreprenual_innovations.png',
        ]);

        $this->seedListItems($expoEI->ActivityID, [
            'requirements' => [
                'Mahasiswa/i UC Makassar aktif',
                'Melampirkan Curriculum Vitae (CV)',
                'Melampirkan portofolio (untuk bidang media/PDD)',
            ],
            'claiming_procedures' => [
                'KP diinput otomatis oleh BMA setelah event selesai',
                'Pastikan terdaftar pada susunan panitia final',
            ],
            'contact_persons' => ['823-3555-5516 (Howeld)'],
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
