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
        ]);

        User::query()->create([
            'Name' => 'KenStudent',
            'NIM' => '1234567890',
            'Email' => 'kokonatyeye@gmail.com',
            'Password' => 'password',
            'Role' => 'student',
        ]);
    }
}
