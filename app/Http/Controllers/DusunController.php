<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class DusunController extends Controller
{
    public function index(Request $request)
    {
        $dusun = Dusun::with('detail_dusun')->latest()->get();
        return inertia('Dusun/Index', compact('dusun'));
    }

    public function store(Request $request)
    {
        $request->validate(['nama' => ['required', 'string', 'min:6']]);
        $dusun = Dusun::create(['nama' => $request->nama]);
        Role::create(['name' => $request->nama, 'guard_name' => 'web']);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah data dusun baru']);
    }

    public function update(Request $request)
    {
        $request->validate(['nama' => ['required', 'string', 'min:6']]);
        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $dusun->update(['nama' => $request->nama]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data dusun ' . $nama]);
    }

    public function delete(Request $request)
    {

        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $role = Role::where('name', '=', $nama);
        $role->delete(); // Menghapus role
        $dusun->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus dusun ' . $nama]);
    }
}
