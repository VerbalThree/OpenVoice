<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller
{
    public function changePassword(Request $request)
    {
        // Define the validation rules
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

        // Check if the provided current password matches the user's password
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
