<?php
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [GoogleAuthController::class, 'user']);
    Route::get('/logout', [GoogleAuthController::class, 'logout']);

    // Items routes
    Route::prefix('items')->group(function () {
        Route::get('/', [ItemController::class, 'index']);
        Route::post('/', [ItemController::class, 'store']);
        Route::get('{id}', [ItemController::class, 'show']);
        Route::put('{id}', [ItemController::class, 'update']);
        Route::delete('{id}', [ItemController::class, 'destroy']);
    });
});