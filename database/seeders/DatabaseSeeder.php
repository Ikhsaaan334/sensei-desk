<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'sensei@schalesensei.com'],
            [
                'name' => 'Sensei',
                'password' => Hash::make('shirokomybeloved'),
                'email_verified_at' => now(),
            ]
        );
    }
}
