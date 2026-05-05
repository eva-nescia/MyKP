<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    // You must specify the custom primary key since you used 'ActivityID' instead of the default 'id'
    protected $primaryKey = 'ActivityID';

    // Allow all fields to be inserted via Seeder/Factory
    protected $guarded = []; 

    // Define the relationship to the User model (optional but helpful!)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'UserID');
    }
}