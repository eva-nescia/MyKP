<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Bookmark;
use App\Models\NotificationRead;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class NotificationController extends Controller
{
    /**
     * Per bookmarked activity, fire a reminder 3 days, 2 days, and 1 day
     * before the registration deadline. Each fire point becomes its own
     * notification row.
     *
     * Reminders that haven't fired yet (fired_at still in the future) are
     * suppressed. Reminders older than this window are also suppressed so
     * the feed doesn't accumulate stale entries.
     */
    private const REMINDER_DAYS_BEFORE = [3, 2, 1];
    private const REMINDER_STALE_AFTER_DAYS = 14;

    /**
     * Compute the current notification list for a user.
     * Pure function over the DB state — same logic used by index() and
     * unreadCount(), so the read/unread bookkeeping never drifts from
     * what the user actually sees.
     */
    private function computeNotifications($user): array
    {
        $now = Carbon::now();
        $rows = collect();

        $activities = Activity::query()->orderBy('created_at', 'desc')->get();
        foreach ($activities as $act) {
            $rows->push([
                'id'          => 'act-' . $act->ActivityID,
                'type'        => 'notification',
                'title'       => 'New Activity Available',
                'description' => $act->name,
                'fired_at'    => Carbon::parse($act->created_at)->toIso8601String(),
            ]);
        }

        $bookmarks = Bookmark::query()
            ->where('user_id', $user->UserID)
            ->with('activity')
            ->get();

        foreach ($bookmarks as $bookmark) {
            $activity = $bookmark->activity;
            if (! $activity || ! $activity->registration_deadline_date) continue;

            $deadline = Carbon::parse($activity->registration_deadline_date)->startOfDay();
            $bookmarkedAt = Carbon::parse($bookmark->created_at);

            foreach (self::REMINDER_DAYS_BEFORE as $daysBefore) {
                $natural = $deadline->copy()->subDays($daysBefore);

                if ($natural->isFuture()) continue;

                $firedAt = $natural->lessThan($bookmarkedAt) ? $bookmarkedAt : $natural;

                if ($now->diffInDays($firedAt, false) < -self::REMINDER_STALE_AFTER_DAYS) continue;

                $label = $daysBefore === 1 ? '1 day' : "{$daysBefore} days";

                $rows->push([
                    'id'          => "bm-{$bookmark->BookmarkID}-{$daysBefore}d",
                    'type'        => 'reminder',
                    'title'       => "Registration deadline in {$label}",
                    'description' => $activity->name,
                    'fired_at'    => $firedAt->toIso8601String(),
                ]);
            }
        }

        return $rows->sortByDesc('fired_at')->values()->all();
    }

    #[OA\Get(
        path: "/api/notifications",
        summary: "List notifications and mark them as read",
        tags: ["Notifications"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(response: 200, description: "OK")]
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $notifications = $this->computeNotifications($user);

        // Mark everything currently visible as read. Visiting the screen
        // implies acknowledgment, so the bell-icon badge clears the next
        // time the dashboard refetches its unread count.
        $this->markAsRead($user, array_column($notifications, 'id'));

        return response()->json($notifications);
    }

    #[OA\Get(
        path: "/api/notifications/unread-count",
        summary: "Number of notifications the user hasn't viewed yet",
        tags: ["Notifications"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(response: 200, description: "OK")]
    public function unreadCount(Request $request): JsonResponse
    {
        $user = $request->user();
        $notifications = $this->computeNotifications($user);

        $ids = array_column($notifications, 'id');
        if (empty($ids)) {
            return response()->json(['count' => 0]);
        }

        $readIds = NotificationRead::query()
            ->where('user_id', $user->UserID)
            ->whereIn('notification_id', $ids)
            ->pluck('notification_id')
            ->all();

        $unread = array_diff($ids, $readIds);

        return response()->json(['count' => count($unread)]);
    }

    private function markAsRead($user, array $ids): void
    {
        if (empty($ids)) return;

        $now = Carbon::now();
        $rows = array_map(fn($id) => [
            'user_id'         => $user->UserID,
            'notification_id' => $id,
            'read_at'         => $now,
        ], $ids);

        // Upsert: insert new (user_id, notification_id) pairs, ignore duplicates.
        // The unique index makes this safe under concurrent reads from the
        // same user (e.g. tab refresh + bell tap in quick succession).
        NotificationRead::query()->upsert($rows, ['user_id', 'notification_id'], ['read_at']);
    }
}
