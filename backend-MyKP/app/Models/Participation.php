<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    protected $primaryKey = 'ParticipationID';

    protected $fillable = [
        'user_id',
        'activity_id',
        'kp_category',
        'kp_amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'UserID');
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id', 'ActivityID');
    }
}
