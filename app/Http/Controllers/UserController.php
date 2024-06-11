<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('jabatan', '!=', 'kepala desa')->get();

        return inertia('User/Index', compact('user'));
    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "name" => 'required|min:6|string',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|min:6',
            "alamat" => 'required|string|min:12',
            "telp" => 'required|numeric|min:12',
            "jabatan" => 'required',
            "dusun" => 'nullable',
            "foto" => 'required|image|mimes:jpg,jpeg,svg,png',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->with(['type' => 'error', 'message' => $validator->errors()->all()])->withErrors($validator)->withInput();
        }
        $foto = $request->file('foto')->store('User/Profil/Foto');
        $dusun = '';
        if ($request->jabatan == 'kepala dusun') {
            $dusun = $request->dusun;
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'alamat' => $request->alamat,
            'telp' => $request->telp,
            'jabatan' => $request->jabatan,
            'dusun' => $dusun,
            'foto' => $foto,
        ]);
        if ($request->jabatan == 'kepala dusun') {
            $user->assignRole($request->dusun);
        } else {
            $user->assignRole('sekretaris desa');
        }
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil menambah data user']);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required|string',
            "email" => 'required|email|unique:users,email,' . $request->id,
            "password" => 'nullable|min:6',
            "alamat" => 'required|string|min:12',
            "telp" => 'required|numeric|min:12',
            "jabatan" => 'required',
            "dusun" => 'nullable',
            "foto" => 'nullable',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->with(['type' => 'error', 'message' => $validator->errors()->all()])->withErrors($validator)->withInput();
        }
        $foto = '';
        $user = User::findOrFail($request->id);
        if ($request->hasFile('foto')) {
            $request->validate([
                'foto' => 'image|mimes:jpg,jpeg,svg,png'
            ]);
            $foto = $request->file('foto')->store('User/Profil/Foto');
        } else {
            $foto = $user->foto;
        }

        $dusun = '';
        if ($request->jabatan == 'kepala dusun') {
            $dusun = $request->dusun;
            $user->removeRole($user->roles->first()->name);
            $user->assignRole($dusun);
        }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'alamat' => $request->alamat,
            'telp' => $request->telp,
            'jabatan' => $request->jabatan,
            'dusun' => $dusun,
            'foto' => $foto,
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil mengubah data user']);
    }
    public function delete(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data user ']);
    }
}
