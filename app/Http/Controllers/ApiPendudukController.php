<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;

class ApiPendudukController extends Controller
{
    public function index(Request $request)
    {
        // suamin 2
        //  istri 3
        $ayah = Penduduk::where('status_hubungan_dalam_keluarga_id', '=', '2')->where('kk', '=', $request->q)->get();
        $ibu = Penduduk::where('status_hubungan_dalam_keluarga_id', '=', '3')->where('kk', '=', $request->q)->get();

        return response()->json([
            'ayah' => $ayah,
            'ibu' => $ibu
        ]);
    }

    public function allPenduduk(Request $request)
    {
        $Penduduk = Penduduk::with(['agama', 'pekerjaan', 'statusHubunganDalamKeluarga', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->orWhere('kk', '=', $request->q)
            ->orWhere('nama', 'like', '%' . $request->q . '%')
            ->orWhere('nik', '=', $request->q)
            ->get();
        return response()->json($Penduduk);
    }

    public function getPendudukKK(Request $request)
    {
        $Penduduk = Penduduk::with(['agama', 'pekerjaan', 'statusHubunganDalamKeluarga', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->where('kk', '=', $request->q)->get();
        return response()->json($Penduduk);
    }
}
