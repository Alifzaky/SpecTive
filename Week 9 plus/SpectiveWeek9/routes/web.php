<?php

use App\Http\Controllers\LaptopController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LaptopController::class, 'index'])->name('home');

// Pengelolaan laptop tanpa autentikasi untuk tahap pengembangan ini.
Route::prefix('laptops')->name('laptops.')->controller(LaptopController::class)->group(function () {
    Route::get('/', 'manage')->name('manage');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::get('/{laptop}/edit', 'edit')->name('edit');
    Route::put('/{laptop}', 'update')->name('update');
    Route::delete('/{laptop}', 'destroy')->name('destroy');
});
