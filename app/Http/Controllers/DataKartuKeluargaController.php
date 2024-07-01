<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\DetailDusun;
use App\Models\Dusun;
use App\Models\Penduduk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DataKartuKeluargaController extends Controller
{
    public function index(Request $request)
    {
        $jabatan = $request->user()->dusun;
        $dusun = Dusun::where('nama', $jabatan)->first();


        if ($jabatan) {
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');
            $kk = Penduduk::query()->with(['detail_dusun' => function ($q) {
                $q->with('dusun');
            }])->whereIn('detail_dusun_id', $detail_dusun)->where('status_hubungan_dalam_keluarga_id', '=', 1)->get();
            foreach ($kk as $item) {
                $data = Penduduk::whereIn('detail_dusun_id', $detail_dusun)->where('kk', $item->kk)->count();
                $item['jumlah_keluarga'] = $data;
            }
        } else {
            $kk = Penduduk::query()->with(['detail_dusun' => function ($q) {
                $q->with('dusun');
            }])->where('status_hubungan_dalam_keluarga_id', '=', 1)->get();
            foreach ($kk as $item) {
                $data = Penduduk::where('kk', $item->kk)->count();
                $item['jumlah_keluarga'] = $data;
            }
        }





        $stat_kk = array();
        foreach (Dusun::latest()->get() as $item) {
            $dusun = Dusun::where('nama', $item->nama)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');
            $penduduk = Penduduk::whereIn('detail_dusun_id', $detail_dusun)->where('status_hubungan_dalam_keluarga_id', '=', 1)->count();
            $stat_kk[] = [
                "nama" => $item->nama,
                "jumlah_penduduk" => $penduduk,
            ];
        }
        return inertia('DataKK/Index', compact('kk',  'stat_kk'));
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
    public function cetak_laporan(Request $request)
    {
        $penduduk = $this->get_data($request);
        $desa = Desa::first();
        return view('pdf.LaporanDataKK', compact('desa', 'penduduk'));
    }
    public function export_laporan(Request $request)
    {
        $data = $this->get_data($request);
        $desa = Desa::first();
        $pdf = Pdf::loadView('pdf.LaporanDataKK', ['desa' => $desa, 'penduduk' => $data])->setPaper('F4', 'landscape');
        $pdfPath = 'PDF/KK/Laporan-Data-Kartu-Keluarga.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'LaporanPenjualanHarian.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }

    public function get_data($request)
    {
        $roles = $request->user()->getRoleNames()[0];
        $query = Penduduk::query()->with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }, 'pekerjaan', 'pendidikan'])->where('status_hubungan_dalam_keluarga_id', '=', 1);
        // cek roles nya
        if ($roles == 'kepala desa' or $roles == 'sekretaris desa') {
            if ($request->dusun_id) {
                $query->whereHas('detail_dusun', function ($query) use ($request) {
                    $query->where('dusun_id', '=', $request->dusun_id);
                });
            }
        } else {
            $query->whereHas('detail_dusun.dusun', function ($query) use ($roles) {
                $query->where('nama', $roles);
            });
        }
        if ($request->nama_kk) {
            $query->where('nama_kk', 'LIKE', '%' . $request->nama_kk . '%');
        }
        if ($request->tanggal_awal) {
            $query->where('created_at', '>=', $request->tanggal_awal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        $kk = $query->get();
        foreach ($kk as $item) {
            $data = Penduduk::where('kk', $item->kk)->count();
            $item['jumlah_keluarga'] = $data;
        }

        return $kk;
    }
}
