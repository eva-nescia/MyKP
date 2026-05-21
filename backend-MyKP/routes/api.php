<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParticipationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/google', [AuthController::class, 'googleLogin']);
Route::middleware('auth:sanctum')->get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'getStudentDashboard']);
Route::get('/activities', [ActivityController::class, 'getAll']);
Route::get('/activities/{id}', [ActivityController::class, 'getById']);
Route::middleware('auth:sanctum')->post('/activities', [ActivityController::class, 'store']);
Route::middleware('auth:sanctum')->post('/activities/{activityId}/upload-image', [ActivityController::class, 'uploadImage']);
Route::middleware('auth:sanctum')->get('/admin/activities', [ActivityController::class, 'getAdminActivities']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::get('/bookmarks/{activity_id}', [BookmarkController::class, 'show'])->whereNumber('activity_id');
    Route::delete('/bookmarks/{activity_id}', [BookmarkController::class, 'destroy'])->whereNumber('activity_id');

    Route::post('/activities/{activity_id}/register', [ParticipationController::class, 'register'])->whereNumber('activity_id');
    Route::get('/participations', [ParticipationController::class, 'history']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/profile/{user}', [ProfileController::class, 'show'])
    ->whereNumber('user');

// Catch-all for unmatched /api/* requests. Without this, Laravel's default
// renderer returns an HTML 404 page which is useless to API clients (and to
// Postman) and confusing when a typo'd endpoint (/api/logi instead of
// /api/login) silently produces a weird parse error on the client.
Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint not found. Check the URL and HTTP method.',
        'path'    => request()->path(),
        'method'  => request()->method(),
    ], 404);
});
