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
        Schema::create('activities', function (Blueprint $table) {
            $table->id('ActivityID');
            // Foreign key linking to the 'UserID' column on the 'users' table
            $table->foreignId('user_id')->constrained('users', 'UserID');
            
            $table->string('name');
            $table->string('kp_category');
            $table->integer('kp_amount');
            $table->string('eligible_generation');
            $table->string('eligible_study_program');
            $table->date('date');
            $table->string('time'); 
            $table->string('location');
            $table->string('registration_link')->nullable();
            $table->date('registration_deadline_date')->nullable();
            $table->time('registration_deadline_time')->nullable();
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->text('claiming_procedure')->nullable();
            $table->text('contact_person')->nullable();
            $table->string('event_poster')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};