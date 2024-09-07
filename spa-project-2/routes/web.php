<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Main SPA entry point
Route::get('/', function () {
    return view('app'); // Should be an ...blade.php
});

// Catch-all route to serve Vue.js app for all other routes
Route::get('/{any}', function(){
    return view('app'); // Ensure that Vue Router can handle the route
})-> where('any', '.*');

// Authentication routes
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('register.store');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.store');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Deletation of account route 
Route::delete('/user', [LoginController::class, 'destroy'])->name('user.destroy');

// Password change route
Route::post('/change-password', [PasswordController::class, 'changePassword'])->name('password.change');

// Forgot Password route
Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
