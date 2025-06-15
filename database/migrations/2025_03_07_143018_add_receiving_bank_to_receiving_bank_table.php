<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('receiving_bank', function (Blueprint $table) {
            $table->string('receiving_bank')->nullable()->after('account_number'); // Allows nullable for SQLite compatibility
        });
    }

    public function down(): void
    {
        Schema::table('receiving_bank', function (Blueprint $table) {
            $table->dropColumn('receiving_bank');
        });
    }
};
