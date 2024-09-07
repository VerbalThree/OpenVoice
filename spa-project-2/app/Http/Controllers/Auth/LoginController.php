<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class LoginController extends Controller
{   
    // Show the Login Form
    public function showLoginForm(){
        return view('auth.login');
    }

    // Handle a login request to the application.    
    public function login(Request $request){

        // Validate the login form data
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // If validation fails, return JSON response with errors
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt to log the user in
        if(Auth::attempt($request->only('email', 'password'))){
            $user = Auth::user();
            $token = $user->createToken('spa-project')->plainTextToken;
            return response()->json([
                'message' => 'Login successful.',
                'token' => $token
            ], 200);
        }

        // Authentication failed, redirect back with error message
        return response()->json([
            'error' => 'Invalid credentials'
        ], 401);
    }

    // Log the user out of the application
    public function logout(){
        Auth::logout();
        return response()->json([
            'message' => 'You have been logged out.'
        ], 200);
    }

    // Deleting the account
    public function destroy(Request $request){
        try{
            $user = Auth::user(); // Get the authenticated user
            $user->delete(); // Delete the user from the database
            Auth::logout(); // Log the user out
            return response()->json(['message' => 'User account deleted successfully.'], 200);
        } catch (\Exception $e){
            return response()->json(['error' => 'Failed to delete user account'], 500);
        }
    }

    // Change the password
    public function changePassword(Request $request){

        // Validate the request
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // If validation fails, return JSON response with errors
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();

        // Check if the provided current password matches the user's passoword
        if(!Hash::check($request->current_password, $user->password)){
            return response()->json([
                'error' => 'Current password is incorrect'
            ], 401);
        }

        // Update the user's password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully.'
        ], 200);
    }
}