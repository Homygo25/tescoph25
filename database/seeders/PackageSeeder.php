<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'package_name' => 'Basic',
                'min_amount' => 200.00,
                'max_amount' => 799.00,
                'daily_shares_rate' => 0.005,
                'available_slots' => 8,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'sort_order' => 1,
            ],
            [
                'package_name' => 'Advance',
                'min_amount' => 800.00,
                'max_amount' => 9999.00,
                'daily_shares_rate' => 0.007,
                'available_slots' => 9,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'sort_order' => 2,
            ],
            [
                'package_name' => 'Premium',
                'min_amount' => 5000.00,
                'max_amount' => 9999.00,
                'daily_shares_rate' => 0.008,
                'available_slots' => 100,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'sort_order' => 3,
            ],
            [
                'package_name' => 'Elite',
                'min_amount' => 10000.00,
                'max_amount' => 9999999.00,
                'daily_shares_rate' => 0.009, // 0.9% per day
                'available_slots' => 26,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'sort_order' => 4,
            ],
        ];

        foreach ($packages as $data) {
            Package::updateOrCreate(
                ['package_name' => $data['package_name']],
                array_merge($data, [
                    'updated_at' => now(),
                ])
            );
        }
    }
}
