<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UpahController;
use App\Http\Controllers\BahanController;
use App\Http\Controllers\AlatController;
use App\Http\Controllers\RabController;
use App\Http\Controllers\VolumeController;
use App\Http\Controllers\AhsController;
use App\Http\Controllers\KategoriPekerjaanController;
use App\Http\Controllers\ItemPekerjaanController;
use App\Http\Controllers\VolumeCalculationController;

// Gunakan route resource untuk setiap modul yang kita buat.
// Jika ingin menghilangkan method create/edit/show, gunakan except.
Route::resource('upah', UpahController::class)->except(['create', 'edit', 'show']);
Route::resource('bahan', BahanController::class)->except(['create', 'edit', 'show']);
Route::resource('alat', AlatController::class)->except(['create', 'edit', 'show']);
Route::resource('rab', RabController::class)->except(['create', 'edit', 'show']);
Route::resource('volume', VolumeController::class)->except(['create', 'edit', 'show']);
Route::resource('ahs', AhsController::class)->except(['create', 'edit', 'show']);
// Route untuk menyimpan data detail via Ajax
Route::post('ahs/detail', [AhsController::class, 'storeDetail'])->name('ahs.detail.store');
Route::get('ahs/{id}/detail', [AhsController::class, 'getDetail'])->name('ahs.detail.get');
Route::put('ahs/{id}/detail', [AhsController::class, 'updateDetail'])->name('ahs.detail.update');

Route::post('/volume/store', [VolumeController::class, 'store'])->name('volume.store');

Route::post('/kategori-pekerjaan', [KategoriPekerjaanController::class, 'store'])->name('kategori-pekerjaan.store');
Route::get('/kategori-pekerjaan/all', [KategoriPekerjaanController::class, 'all'])->name('kategori-pekerjaan.all');
Route::put('/kategori-pekerjaan/{id}', [KategoriPekerjaanController::class, 'update'])->name('kategori-pekerjaan.update');
Route::delete('/kategori-pekerjaan/{id}', [KategoriPekerjaanController::class, 'destroy'])->name('kategori-pekerjaan.destroy');
Route::post('/kategori-pekerjaan/update-order', [KategoriPekerjaanController::class, 'updateOrder'])->name('kategori-pekerjaan.update-order');
Route::put('/kategori-pekerjaan/update-order', [KategoriPekerjaanController::class, 'updateOrder'])->name('kategori-pekerjaan.update-order');

Route::get('/ahsp/all', [AhsController::class, 'all'])->name('ahsp.all');

Route::post('/item-pekerjaan', [ItemPekerjaanController::class, 'store'])->name('item-pekerjaan.store');
Route::delete('/item-pekerjaan/{id}', [ItemPekerjaanController::class, 'destroy'])->name('item-pekerjaan.destroy');

Route::get('/volume-calculations', [VolumeCalculationController::class, 'index'])->name('volume-calculations.index');
Route::post('/volume-calculations', [VolumeCalculationController::class, 'store'])->name('volume-calculations.store');

Route::post('/volume-calculations', [VolumeCalculationController::class, 'store']);

Route::get('/volume-calculations/{id}', [VolumeCalculationController::class, 'show']);

Route::delete('/volume-calculations/{id}', [VolumeCalculationController::class, 'destroy']);
Route::put('/volume-calculations/{id}', [VolumeCalculationController::class, 'update']);

Route::put('/item-pekerjaans/{id}/update-volume', [ItemPekerjaanController::class, 'updateVolume']);

Route::get('/', function () {
    return view('welcome');
})->name('home');
