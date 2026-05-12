<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KP_Progress extends Model
{
    use HasFactory;

    protected $table = 'kp_progress';
    protected $primaryKey = 'ProgressID';
    protected $fillable = [
        'user_id',
        'kp_category',
        'kp_current_amount',
        'kp_amount_requirement',
        'kp_status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'UserID');
    }
}
