<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')
                ->constrained('activities', 'ActivityID')
                ->cascadeOnDelete();
            $table->text('value');
            $table->timestamps();
        });

        Schema::create('activity_claiming_procedures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')
                ->constrained('activities', 'ActivityID')
                ->cascadeOnDelete();
            $table->text('value');
            $table->timestamps();
        });

        Schema::create('activity_contact_persons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')
                ->constrained('activities', 'ActivityID')
                ->cascadeOnDelete();
            $table->text('value');
            $table->timestamps();
        });

        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['requirements', 'claiming_procedure', 'contact_person']);
        });
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->text('requirements')->nullable();
            $table->text('claiming_procedure')->nullable();
            $table->text('contact_person')->nullable();
        });

        Schema::dropIfExists('activity_contact_persons');
        Schema::dropIfExists('activity_claiming_procedures');
        Schema::dropIfExists('activity_requirements');
    }
};
