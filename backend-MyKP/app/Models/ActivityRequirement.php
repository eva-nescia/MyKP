<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityRequirement extends Model
{
    protected $fillable = ['activity_id', 'value'];

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id', 'ActivityID');
    }
}
