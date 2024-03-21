<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailDusunController;
use App\Http\Controllers\DusunController;
use App\Http\Controllers\GrafikController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('grafik-penduduk', [GrafikController::class, 'index'])->name('grafik');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');



Route::get('dusun', [DusunController::class, 'index'])->name('dusun');
Route::post('create-dusun', [DusunController::class, 'store'])->name('post.dusun');
Route::post('update-dusun', [DusunController::class, 'update'])->name('update.dusun');
Route::delete('delete-dusun/', [DusunController::class, 'delete'])->name('delete.dusun');

Route::post('create-detail-dusun', [DetailDusunController::class, 'store'])->name('post.detail-dusun');
Route::post('update-detail-dusun', [DetailDusunController::class, 'update'])->name('update.detail-dusun');
Route::delete('delete-detail-dusun/', [DetailDusunController::class, 'delete'])->name('delete.detail-dusun');
