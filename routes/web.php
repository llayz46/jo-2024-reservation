<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', WelcomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/tickets/{ticket:slug}', [TicketController::class, 'show'])->name('tickets.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
