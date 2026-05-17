<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'getStudentDashboard']);
Route::get('/activities', [ActivityController::class, 'getAll']);
Route::get('/activities/{id}', [ActivityController::class, 'getById']);
// Google login route — temporarily disabled. Re-enable later.
// Route::post('/login/google', [AuthController::class, 'googleLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::get('/bookmarks/{activity_id}', [BookmarkController::class, 'show'])->whereNumber('activity_id');
    Route::delete('/bookmarks/{activity_id}', [BookmarkController::class, 'destroy'])->whereNumber('activity_id');
});

Route::get('/profile/{user}', [ProfileController::class, 'show'])
    ->whereNumber('user');
