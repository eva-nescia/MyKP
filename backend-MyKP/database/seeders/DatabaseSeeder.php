<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        $adminOrganizers = [
            ['Name' => 'Student Council',                          'NIM' => '09876543210', 'Email' => 'studentcouncil@ciputra.ac.id',  'AvatarSeed' => 'sc'],
            ['Name' => 'FDU',                 'NIM' => '09876543211', 'Email' => 'fdu@ciputra.ac.id',             'AvatarSeed' => 'fdu'],
            ['Name' => 'BMA',             'NIM' => '09876543212', 'Email' => 'empowercare@ciputra.ac.id',     'AvatarSeed' => 'bma'],
            ['Name' => 'Dikti Saintek Berdampak',                  'NIM' => '09876543213', 'Email' => 'diktisaintek@ciputra.ac.id',    'AvatarSeed' => 'dikti'],
            ['Name' => 'MSU',       'NIM' => '09876543214', 'Email' => 'msu@ciputra.ac.id',             'AvatarSeed' => 'msu'],
            ['Name' => 'O-Week Committee 2026',                    'NIM' => '09876543215', 'Email' => 'oweek2026@ciputra.ac.id',       'AvatarSeed' => 'oweek'],
            ['Name' => 'Spiritual Affairs Committee',              'NIM' => '09876543216', 'Email' => 'reflektif@ciputra.ac.id',       'AvatarSeed' => 'sac'],
            ['Name' => 'Onyx Youth Community',                     'NIM' => '09876543217', 'Email' => 'oyc@ciputra.ac.id',             'AvatarSeed' => 'oyc'],
            ['Name' => 'Entrepreneurial Innovations Committee',    'NIM' => '09876543218', 'Email' => 'expoeii@ciputra.ac.id',         'AvatarSeed' => 'eii'],
        ];

        foreach ($adminOrganizers as $org) {
            User::query()->create([
                'Name' => $org['Name'],
                'NIM' => $org['NIM'],
                'Email' => $org['Email'],
                'Jurusan' => null, // admins aren't enrolled in a study program
                'Password' => 'password',
                'Role' => 'admin',
                'ProfilePicture' => 'https://i.pravatar.cc/300?u=' . $org['AvatarSeed'],
            ]);
        }

        User::query()->create([
            'Name' => 'Andi Tubagus Faatih Keane',
            'NIM' => '1234567890',
            'Email' => 'atubagus@student.ciputra.ac.id',
            'Jurusan' => 'IMT',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=ken.student',
        ]);

        User::query()->create([
            'Name' => 'Exsel Octaviand Gosal',
            'NIM' => '89012345678',
            'Email' => 'eoctaviand@student.ciputra.ac.id',
            'Jurusan' => 'VCD',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=exsel.student',
        ]);

        User::query()->create([
            'Name' => 'Michelle Stevany Venda Dati',
            'NIM' => '78901234567',
            'Email' => 'mstevany@student.ciputra.ac.id',
            'Jurusan' => 'MAN',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=michelle.student',
        ]);

        // Add your friend's Google account email here so they can log in
        // User::query()->create([
        //     'Name' => 'FriendName',
        //     'NIM' => '0000000000',
        //     'Email' => 'friends.google.email@gmail.com',
        //     'Password' => 'password',
        //     'Role' => 'student',
        // ]);

        $this->call(ActivitySeeder::class);
        $this->call(KPProgressSeeder::class);
        // eoctaviand demo: near-complete KP via throwaway dummy activities
        // (every category filled except Penelitian). Replaces the old
        // DemoStudentProgressSeeder, which credited from the real activities
        // and left the profile sparse.
        $this->call(EoctaviandHistorySeeder::class);
    }
}
