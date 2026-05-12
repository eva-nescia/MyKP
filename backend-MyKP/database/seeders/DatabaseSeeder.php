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
            'Name' => 'ExselAdmin',
            'NIM' => '09876543210',
            'Email' => 'exsel@admin.ac.id',
            'Password' => 'password',
            'Role' => 'admin',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=exsel.admin',
        ]);

        User::query()->create([
            'Name' => 'KenStudent',
            'NIM' => '1234567890',
            'Email' => 'atubagus@student.ciputra.ac.id',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=ken.student',
        ]);

        User::query()->create([
            'Name' => 'ExselStudent',
            'NIM' => '89012345678',
            'Email' => 'eoctaviand@student.ciputra.ac.id',
            'Password' => 'password',
            'Role' => 'student',
            'ProfilePicture' => 'https://i.pravatar.cc/300?u=exsel.student',
        ]);

        User::query()->create([
            'Name' => 'MichelleStudent',
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
