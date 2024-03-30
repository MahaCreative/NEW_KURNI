<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\Dusun;
use App\Models\Penduduk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DataKartuKeluargaController extends Controller
{
    public function index(Request $request)
    {

        $query = Penduduk::query()->with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->where('status_hubungan_dalam_keluarga_id', '=', 1);
        $roles = $request->user()->getRoleNames()[0];
        if ($roles == 'kepala desa' or $roles == 'sekretaris desa') {
            $kk = $query->get();
        } else {
            $kk = $query->whereHas('detail_dusun.dusun', function ($q) use ($roles) {
                $q->where('nama', '=', $roles);
            })->get();
        }

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
