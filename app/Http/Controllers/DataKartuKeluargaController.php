<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use App\Models\Penduduk;
use Illuminate\Http\Request;

class DataKartuKeluargaController extends Controller
{
    public function index(Request $request)
    {
        $query = Penduduk::query();
        $kk = $query->with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->where('status_hubungan_dalam_keluarga_id', '=', 1)->get();

        foreach ($kk as $item) {
            $data = Penduduk::where('kk', $item->kk)->count();
            $item['jumlah_keluarga'] = $data;
        }

        $dusun = Dusun::with(['detail_dusun' => function ($q) {
            $q->withCount('penduduk');
        }])->get();
        $countPendudukDusun = 0;
        foreach ($dusun as $item) {
            foreach ($item->detail_dusun as $detail) {
                $countPendudukDusun += $detail->penduduk_count;
            }
            $item['total_penduduk'] = $countPendudukDusun;
        }



        return inertia('DataKK/Index', compact('kk', 'dusun'));
    }

    public function per_kk(Request $request, $kk)
    {
        $penduduk = Penduduk::with([
            'pekerjaan',
            'pendidikan',
            'statusHubunganDalamKeluarga',
            'statusPerkawinan',
        ])->where('kk', $kk)->get();
        $kepalaKeluarga = Penduduk::with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->where('kk', $kk)->where('status_hubungan_dalam_keluarga_id', '=', 1)->first();
        $jumlahBelumKawin = Penduduk::where('kk', $kk)->where('status_perkawinan_id', '=', 1)->count();
        $jumlahAnak = Penduduk::where('kk', $kk)->where('status_hubungan_dalam_keluarga_id', '=', 4)->count();

        return inertia('DataKK/ShowKK', compact(
            'penduduk',
            'kepalaKeluarga',
            'jumlahBelumKawin',
            'jumlahAnak',
        ));
    }
}
