<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DesaController extends Controller
{
    public function index(Request $request)
    {
        $desa = Desa::first();
        return inertia('Desa/Index', compact('desa'));
    }

    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nama_desa' => ['required', 'string', 'min:6'],
            'nama_kecamatan' => ['required', 'string', 'min:6'],
            'nama_kabupaten' => ['required', 'string', 'min:6'],
            'alamat' => ['required', 'string', 'min:6'],
            'nama_kepala_desa' => ['required', 'string', 'min:6'],
            'alamat_kepala_desa' => ['required', 'string', 'min:6'],

        ]);
        if ($validator->fails()) {
            return redirect()->back()->with(['type' => 'errors', 'message' => $validator->errors()->all()]);
        }
        $desa = Desa::first();

        $desa->update([
            'nama_desa' => $request->nama_desa,
            'nama_kecamatan' => $request->nama_kecamatan,
            'nama_kabupaten' => $request->nama_kabupaten,
            'alamat' => $request->alamat,
            'nama_kepala_desa' => $request->nama_kepala_desa,
            'alamat_kepala_desa' => $request->alamat_kepala_desa,

        ]);
        return redirect()->back()->with(['type' => 'Success', 'message' => 'Berhasil memperbaharui profile Desa']);
    }

    public function update_foto_desa(Request $request)
    {

        $request->validate(['logo' => ['required', 'image', 'mimes:jpeg,jpg,png,svg'],]);
        $desa = Desa::first();

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo')->store('desa');
        } else {
            $logo = $desa->logo;
        }
        $desa->update(['logo' => $logo]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil Memperbaharui Logo Desa']);
    }
}
