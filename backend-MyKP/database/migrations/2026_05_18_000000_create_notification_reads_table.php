<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tracks which derived notifications a user has marked as read.
        // notification_id is the synthetic id produced by NotificationController
        // (e.g. "act-5", "bm-3-2d"). This lets us count unread items without
        // materialising every notification as its own row.
        Schema::create('notification_reads', function (Blueprint $table) {
            $table->id('NotificationReadID');
            $table->foreignId('user_id')->constrained('users', 'UserID')->cascadeOnDelete();
            $table->string('notification_id');
            $table->timestamp('read_at')->useCurrent();

            $table->unique(['user_id', 'notification_id']);
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_reads');
    }
};
