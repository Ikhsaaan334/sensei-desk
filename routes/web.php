<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Public\PostController as PublicPostController;
use App\Http\Controllers\Admin\PostController as AdminPostController;

Route::get('/', [PublicPostController::class, 'index'])->name('home');
Route::get('/post/{slug}', [PublicPostController::class, 'show'])->name('post.show');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminPostController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::post('/upload-image', [AdminPostController::class, 'uploadImage'])->name('upload_image');
    Route::resource('posts', AdminPostController::class);
});

require __DIR__.'/settings.php';
