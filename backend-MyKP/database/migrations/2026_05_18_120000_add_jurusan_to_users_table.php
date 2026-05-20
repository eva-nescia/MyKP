<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Nullable so the column slots into existing rows without backfill.
            // Values should be one of the strings the activities use in
            // `eligible_study_program` (e.g. "All Prodi" means open to everyone).
            $table->string('Jurusan')->nullable()->after('Email');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('Jurusan');
        });
    }
};
