<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Define the login route
Route::post('/login', [LoginController::class, 'login']);

// Optional: Define a logout route
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// Define a route to fetch user info
Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});

// Route for changing password
Route::middleware('auth:sanctum')->post('/change-password', [PasswordController::class, 'changePassword']);

// Route to send password reset link
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);
