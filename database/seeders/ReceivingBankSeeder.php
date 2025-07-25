<?php

namespace Database\Seeders;

use App\Models\ReceivingBank;
use Illuminate\Database\Seeder;

class ReceivingBankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReceivingBank::updateOrInsert(
            ['bank_name' => 'BPI'],
            [
                'receiving_bank' => 'Bank of the Philippine Islands/ BPI Savings',
                'payment_channel' => 'Bank Transfer - Instapay',
                'account_name' => 'CVS Pharmacy',
                'account_number' => '4006890693',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        ReceivingBank::updateOrInsert(
            ['bank_name' => 'RCBC'],
            [
                'receiving_bank' => 'RCBC Savings',
                'payment_channel' => 'Bank Transfer - Instapay',
                'account_name' => 'CVS Pharmacy',
                'account_number' => '7591395917',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Uncomment to add GoTyme
        // ReceivingBank::updateOrInsert(
        //     ['bank_name' => 'GoTyme'],
        //     [
        //         'receiving_bank' => 'GoTyme Bank',
        //         'payment_channel' => 'Bank Transfer - Instapay',
        //         'account_name' => 'CVS Pharmacy',
        //         'account_number' => '017537760396',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]
        // );
    }
}
