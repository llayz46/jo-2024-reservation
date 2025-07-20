<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\Admin\TicketController as AdminTicketController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::get('success', [CartController::class, 'success'])->name('cart.success');
    Route::get('order/{order}', OrderController::class)->name('order');
    Route::get('/qr/item/{item}', QrCodeController::class)->middleware('auth')->name('qr.item');

    Route::resource('admin/tickets', AdminTicketController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.tickets')
        ->middleware('admin');
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'addItem'])->name('cart.add');
    Route::post('/remove', [CartController::class, 'removeItem'])->name('cart.remove');
    Route::put('/update', [CartController::class, 'handleItemQuantity'])->name('cart.update');
    Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
});

Route::get('/tickets/{ticket:slug}', [TicketController::class, 'show'])->name('tickets.show');

Route::get('/scan', ScanController::class)->name('scan');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
