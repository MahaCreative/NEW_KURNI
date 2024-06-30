<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
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
        $permission = Role::create(['name' => $dusun->nama]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah data dusun baru']);
    }

    public function update(Request $request)
    {
        $request->validate(['nama' => ['required', 'string', 'min:6']]);
        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $permission = Role::where('name', $nama)->first();
        $dusun->update(['nama' => $request->nama]);
        $permission->update(['name' => $dusun->nama]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data dusun ' . $nama]);
    }

    public function delete(Request $request)
    {

        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $permission = Role::where('name', $nama)->first();

        $permission->delete();
        $dusun->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus dusun ' . $nama]);
    }
}
