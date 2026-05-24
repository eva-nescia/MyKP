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
        Schema::table('activities', function (Blueprint $table) {
            // Add indexes for search optimization
            $table->index('name', 'idx_activities_name');
            $table->index('kp_category', 'idx_activities_category');
            $table->index('date', 'idx_activities_date');
            $table->index(['kp_category', 'date'], 'idx_activities_category_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropIndex('idx_activities_name');
            $table->dropIndex('idx_activities_category');
            $table->dropIndex('idx_activities_date');
            $table->dropIndex('idx_activities_category_date');
        });
    }
};
