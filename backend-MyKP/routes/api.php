<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParticipationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'getStudentDashboard']);
Route::get('/activities', [ActivityController::class, 'getAll']);
Route::get('/activities/{id}', [ActivityController::class, 'getById']);
Route::middleware('auth:sanctum')->post('/activities', [ActivityController::class, 'store']);
Route::middleware('auth:sanctum')->post('/activities/{activityId}/upload-image', [ActivityController::class, 'uploadImage']);
Route::middleware('auth:sanctum')->get('/admin/activities', [ActivityController::class, 'getAdminActivities']);
// Google login route — temporarily disabled. Re-enable later.
// Route::post('/login/google', [AuthController::class, 'googleLogin']);

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
