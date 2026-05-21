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

    /**
     * Build a category-by-category summary for a given user, plus aggregate totals.
     * Status is derived from the amounts so it stays in sync even if stored
     * kp_status drifts.
     */
    public static function summaryForUser(int $userId): array
    {
        $rows = self::query()->where('user_id', $userId)->orderBy('ProgressID')->get();

        $categories = $rows->map(function ($row) {
            $current = (int) $row->kp_current_amount;
            $target  = (int) $row->kp_amount_requirement;
            $completed = $target > 0 ? $current >= $target : false;
            $percentage = $target > 0
                ? min(100, (int) round(($current / $target) * 100))
                : 0;

            return [
                'id'         => $row->ProgressID,
                'title'      => $row->kp_category,
                'current'    => $current,
                'target'     => $target,
                'status'     => $completed ? 'Completed' : 'On Progress',
                'percentage' => $percentage,
            ];
        })->values();

        $completedCount   = $categories->where('status', 'Completed')->count();
        $inProgressCount  = $categories->count() - $completedCount;
        $totalCurrent     = (int) $categories->sum('current');
        $totalTarget      = (int) $categories->sum('target');
        $overallPercent   = $totalTarget > 0
            ? min(100, (int) round(($totalCurrent / $totalTarget) * 100))
            : 0;

        return [
            'categories' => $categories->all(),
            'summary'    => [
                'completed'           => $completedCount,
                'in_progress'         => $inProgressCount,
                'total_current'       => $totalCurrent,
                'total_target'        => $totalTarget,
                'overall_percentage'  => $overallPercent,
            ],
        ];
    }
}
