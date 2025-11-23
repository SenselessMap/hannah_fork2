<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * Validation du formulaire de création avant insertion de l'usager
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:4|max:30',
            'email' => 'required|email|unique:users',
            'password' => [
                'required','string','confirmed', 'max:20',
                Password::min(6)->letters()->mixedCase()->numbers()->symbols()
            ]
        ],
[],
        [
            'name' => 'nom',
            'email' => 'courriel',
            'password' => 'mot de passe'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message'=> 'Votre inscription a été créé avec succès! Veuillez vous connecter.!'
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
