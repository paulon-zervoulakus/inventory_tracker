<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            $user = User::updateOrCreate(
                ['google_id' => $googleUser->getId()],
                [
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            Auth::login($user);
            
            // Create token for API authentication
            $token = $user->createToken('auth-token')->plainTextToken;
            
            // Redirect to frontend with token
            return redirect()->away("http://localhost:3000/dashboard?token={$token}");
            
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->away('http://localhost:3000/auth/error');
        }
    }

    /**
     * Get authenticated user data
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout user and revoke token
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully']);
    }
}