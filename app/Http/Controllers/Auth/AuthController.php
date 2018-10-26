<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\{JWTException};
use App\User;
use Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'email|required',
            'password' => 'required'
        ]);

        try {
            if (!$token = $this->auth->attempt($request->only('email', 'password'))) {
                return response()->json([
                    'errors' => [
                        'root' => 'Could not sign u in with those details'
                    ]
                ], 401);
            }
        } catch (JWTException $e)
        {
            return response()->json([
                    'errors' => [
                        'root' => 'Failed'
                    ]
                ], $e->getStatusCode());
        }

        return response()->json([
            'data' => $request->user(),
            'meta' => [
                'token' => $token
            ]
        ], 200);
    }

    
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // attempt auth with jwt
        $token = $this->auth->attempt($request->only('email', 'password'));

        return response()->json([
            'data' => $user,
            'meta' => [
                'token' => $token
            ]
        ], 200);
    }

    // blacklist the token so they cant be reused
    public function logout()
    {
        $this->auth->invalidate($this->auth->getToken());

        return response(null, 200);
    }

    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
        ]);
    }
}
