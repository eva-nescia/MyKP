<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('participations', function (Blueprint $table) {
            $table->id('ParticipationID');
            $table->foreignId('user_id')->constrained('users', 'UserID')->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained('activities', 'ActivityID')->cascadeOnDelete();
            // Denormalised so history queries don't break if the activity is later edited/deleted.
            $table->string('kp_category');
            $table->integer('kp_amount');
            $table->string('status')->default('Completed');
            $table->timestamps();

            $table->unique(['user_id', 'activity_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participations');
    }
};
