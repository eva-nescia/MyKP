<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $primaryKey = 'ActivityID';

    protected $fillable = [
        'user_id',
        'name',
        'kp_category',
        'kp_amount',
        'eligible_generation',
        'eligible_study_program',
        'date',
        'time',
        'location',
        'registration_link',
        'registration_deadline_date',
        'registration_deadline_time',
        'description',
        'requirements',
        'claiming_procedure',
        'contact_person',
        'event_poster',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'UserID');
    }
}
