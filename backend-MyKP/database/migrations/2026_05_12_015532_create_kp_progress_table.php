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
        Schema::create('kp_progress', function (Blueprint $table) {
            $table->id('ProgressID');
            $table->foreignId('user_id')->constrained('users', 'UserID');
            $table->string('kp_category');
            $table->integer('kp_current_amount')->default(0);
            $table->integer('kp_amount_requirement')->default(0); 
            $table->string('kp_status')->default('On Progress');   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kp_progress');
    }
};