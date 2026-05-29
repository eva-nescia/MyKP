<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Archived activities are "old" events that already happened. They stay in
     * the DB so participation history can still reference them, but they are
     * hidden from the browsable activity list and the admin's "My Activities".
     */
    public function up(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->boolean('archived')->default(false)->after('event_poster');
        });
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn('archived');
        });
    }
};
