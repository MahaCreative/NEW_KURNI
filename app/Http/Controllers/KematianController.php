<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\Kematian;
use App\Models\Penduduk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class KematianController extends Controller
{
    public function index(Request $request)
    {
        $query = Kematian::query()->with(['agama', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }]);
        $roles = $request->user()->getRoleNames()[0];
        // dd($roles == 'kepala desa' or $roles == 'sekretaris desa');
        if ($roles == 'kepala desa' or $roles == 'sekretaris desa') {
            $kelahiran = $query->get();
        } else {
            $kelahiran = $query->whereHas('detail_dusun.dusun', function ($q) use ($roles) {
                $q->where('nama', '=', $roles);
            })->get();
        }
        $kematian = $query->get();
        return inertia('Kematian/Index', compact('kematian'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16'],
            'kk'                                => ['required', 'digits:16'],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string',],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'pendidikan_id'                     => ['nullable', 'numeric'],
            'pekerjaan_id'                      => ['nullable', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'status_perkawinan_id'              => ['required', 'numeric'],
            'status_hubungan_dalam_keluarga_id' => ['required', 'numeric'],
            'hari_kematian' => ['required', 'in:senin,selasa,rabu,kamis,jumat,sabtu,minggu'],
            'tgl_kematian' => ['required'],
            'waktu_kematian' => ['required'],
            'sebab_kematian' => ['required', 'string', 'min:5'],
            'tempat_kematian' => ['nullable', 'string'],
        ]);
        $penduduk = Penduduk::findOrFail($request->id);
        $attr['kd_kematian'] = now()->format('dmy') . Kematian::count() + 1;
        $attr['nik_ayah'] = $penduduk->nik_ayah;
        $attr['nik_ibu'] = $penduduk->nik_ibu;
        $attr['nama_ayah'] = $penduduk->nama_ayah;
        $attr['nama_ibu'] = $penduduk->nama_ibu;
        $attr['alamat'] = $penduduk->alamat;
        $attr['detail_dusun_id'] = $request->detail_dusun_id;
        $attr['status_konfirmasi'] = 'di terima';
        $kematian = Kematian::create($attr);
    }
    public function update(Request $request)
    {
        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16'],
            'kk'                                => ['required', 'digits:16'],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string',],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'pendidikan_id'                     => ['nullable', 'numeric'],
            'pekerjaan_id'                      => ['nullable', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'status_perkawinan_id'              => ['required', 'numeric'],
            'status_hubungan_dalam_keluarga_id' => ['required', 'numeric'],
            'hari_kematian' => ['required', 'in:senin,selasa,rabu,kamis,jumat,sabtu,minggu'],
            'tgl_kematian' => ['required'],
            'waktu_kematian' => ['required'],
            'sebab_kematian' => ['required', 'string', 'min:5'],
            'tempat_kematian' => ['nullable', 'string'],
        ]);
        $attr['kd_kematian'] = now()->format('dmy') . Kematian::count() + 1;
        $attr['detail_dusun_id'] = $request->detail_dusun_id;
        $penduduk = Penduduk::findOrFail($request->id);
        $attr['nik_ayah'] = $penduduk->nik_ayah;
        $attr['nik_ibu'] = $penduduk->nik_ibu;
        $attr['nama_ayah'] = $penduduk->nama_ayah;
        $attr['nama_ibu'] = $penduduk->nama_ibu;
        $attr['alamat'] = $penduduk->alamat;
        $kematian = Kematian::findOrFail($request->id);
        $kematian->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data kematian']);
    }
    public function delete(Request $request)
    {
        $kematian = Kematian::findOrFail($request->id);
        $kematian->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data kematian']);
    }

    public function konfirmasi(Request $request)
    {

        $kematian = Kematian::findOrFail($request->id);

        $kematian->update(['status_konfirmasi' => $request->konfirmasi]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengkonfirmasi data kematian']);
    }

    public function cetak_suket(Request $request, $id)
    {
        $kematian = Kematian::with('agama', 'pekerjaan', 'pendidikan', 'statusPerkawinan')->findOrFail($id);
        return inertia('Kematian/CetakSuket', compact('kematian'));
    }

    public function export_laporan(Request $request)
    {
        $kematian = $this->get_data($request);
        $desa = Desa::first();
        $pdf = Pdf::loadView('pdf.LaporanDataKematian', ['desa' => $desa, 'kematian' => $kematian])->setPaper('F4', 'landscape');
        $pdfPath = 'PDF/Penduduk/Laporan-Data-Kematian.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'Laporan-Data-Kematian.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }
    public function cetak_laporan(Request $request)
    {
        $kematian = $this->get_data($request);
        $desa = Desa::first();
        // dd($request->all());
        return view('pdf.LaporanDataKematian', compact('desa', 'kematian'));
    }
    public function get_data($request)
    {
        $query = Kematian::query()->with(['agama', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }, 'pekerjaan', 'statusHubunganDalamKeluarga', 'statusPerkawinan']);
        // cek roles nya
        $roles = $request->user()->getRoleNames()[0];
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
        if ($request->sebab_kematian) {
            $query->where('sebab_kematian', '=', $request->sebab_kematian);
        }
        if ($request->tanggal_awal) {
            $query->where('tgl_kematian', '>=', $request->tanggal_awal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tgl_kematian', '<=', $request->sampai_tanggal);
        }
        $kematian = $query->get();
        return $kematian;
    }
}
