<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $primaryKey = 'BookmarkID';

    protected $fillable = [
        'user_id',
        'activity_id',
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
