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
        User::query()->create([
            'Name' => 'Student Council',
            'NIM' => '09876543210',
            'Email' => 'studentcouncil@ciputra.ac.id',
            'Password' => 'password',
            'Role' => 'admin',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=exsel.admin',
        ]);

        User::query()->create([
            'Name' => 'Andi Tubagus Faatih Keane',
            'NIM' => '1234567890',
            'Email' => 'atubagus@student.ciputra.ac.id',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=ken.student',
        ]);

        User::query()->create([
            'Name' => 'Exsel Octaviand Gosal',
            'NIM' => '89012345678',
            'Email' => 'eoctaviand@student.ciputra.ac.id',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=exsel.student',
        ]);

        User::query()->create([
            'Name' => 'Michelle Stevany Venda Dati',
            'NIM' => '78901234567',
            'Email' => 'mstevany@student.ciputra.ac.id',
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
    }
}
