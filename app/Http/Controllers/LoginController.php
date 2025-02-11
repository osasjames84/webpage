<?php
// made by sw734
// controller used for Login page
// checks credentials given against db & if they match login

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LoginUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // check if the user is logged in already
    // loggedIn true if logged in
    public function loggedInCheck()
    {
        return Inertia::render('LoginPage', [
            'loggedIn' => Auth::check(),
        ]);
    }

    public function login(Request $request)
    {
        // email & password must be present
        $request->validate
        ([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // looking for the first row in the db table where the credentials match
        $user = LoginUser::where('email', $request->email)->first();

        // password given in login page is hashed then compared to db hashed password for that account
        // if the passwords match login the user
        if($user && Hash::check($request->password, $user->password))
        {
            // if the user has checked rememberMe box, use laravel built in remember me feature
            if($request->has('rememberMe') && $request->rememberMe == true)
            {
                Auth::login($user, true);
            }
            // if not checked rememberMe then do not remember the user
            else
            {
                Auth::login($user);
            }

            return Inertia::location('/home');
        }

        // unsure how to implement this yet... TODO
        // if login was unsuccessful
        return back()->withErrors
        ([
            'email' => 'given details do not match with an account, please make sure they are correct & try again',
        ]);
    }
}