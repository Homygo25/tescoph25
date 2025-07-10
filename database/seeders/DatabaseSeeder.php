<?php

namespace Database\Seeders;

use App\Models\ReceivingBank;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            PackageSeeder::class,
            ReceivingBankSeeder::class,
            // PasswordResetTokensSeeder::class,
            // SessionsTableSeeder::class,
        ]);
    }
}