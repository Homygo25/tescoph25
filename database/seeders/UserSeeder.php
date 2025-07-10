<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();

        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'gender' => 'm',
                'role' => 'admin',
                'balance' => 0.00, // <-- add this
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Regular User',
                'username' => 'user1',
                'email' => 'user@example.com',
                'password' => Hash::make('userpass123'),
                'gender' => 'f',
                'role' => 'client',
                'balance' => 0.00, // <-- add this line
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
