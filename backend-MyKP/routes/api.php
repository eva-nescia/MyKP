<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'getStudentDashboard']);
// Google login route — temporarily disabled. Re-enable later.
// Route::post('/login/google', [AuthController::class, 'googleLogin']);
