<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use Illuminate\Http\Request;

class DusunController extends Controller
{
    public function index(Request $request)
    {
        $dusun = Dusun::with('detail_dusun')->latest()->get();
        return inertia('Dusun/Index', compact('dusun'));
    }

    public function store(Request $request)
    {

        $dusun = Dusun::create(['nama' => $request->nama]);
    }

    public function update(Request $request)
    {

        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $dusun->update(['nama' => $request->nama]);
    }

    public function delete(Request $request)
    {

        $dusun = Dusun::findOrFail($request->id);
        $nama = $dusun->nama;
        $dusun->delete();
    }
}
