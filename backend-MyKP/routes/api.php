<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
// Google login route — temporarily disabled. Re-enable later.
// Route::post('/login/google', [AuthController::class, 'googleLogin']);

Route::get('/profile/{user}', [ProfileController::class, 'show'])
    ->whereNumber('user');
