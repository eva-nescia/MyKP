<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityContactPerson extends Model
{
    // Laravel's pluralizer turns "Person" into "people"; pin the table name
    // so Eloquent doesn't go looking for `activity_contact_people`.
    protected $table = 'activity_contact_persons';

    protected $fillable = ['activity_id', 'value'];

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id', 'ActivityID');
    }
}
