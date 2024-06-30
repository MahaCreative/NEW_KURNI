<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\DetailDusun;
use App\Models\Dusun;
use App\Models\Penduduk;
use App\Models\StatusHubunganDalamKeluarga;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PendudukController extends Controller
{
    public function index(Request $request)
    {
        $query = Penduduk::query()->with([
            'golongan_darah',
            'pekerjaan',
            'pendidikan',
            'statusHubunganDalamKeluarga',
            'statusPerkawinan', 'agama', 'detail_dusun' => function ($q) {
                $q->with('dusun');
            }
        ]);


        $roles = $request->user()->getRoleNames()[0];

        // dd($roles == 'kepala desa' or $roles == 'sekretaris desa');
        if ($roles == 'kepala desa' or $roles == 'sekretaris desa') {
            $penduduk = $query->get();
        } else {
            $penduduk = $query->whereHas('detail_dusun.dusun', function ($q) use ($roles) {
                $q->where('nama', '=', $roles);
            })->get();
        }
        $jumlahPenduduk = Penduduk::count();
        $jumlahKepalaKeluarga = StatusHubunganDalamKeluarga::withCount('penduduk')->where('nama', 'kepala keluarga')->first();
        $jumlahLakiLaki = Penduduk::where('jenis_kelamin', '=', 1)->count();
        $jumlahPerempuan = Penduduk::where('jenis_kelamin', '=', 2)->count();


        return inertia('Penduduk/Index', compact('penduduk', 'jumlahPenduduk', 'jumlahKepalaKeluarga', 'jumlahLakiLaki', 'jumlahPerempuan'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16', 'unique:penduduks,nik'],
            'kk'                                => ['required', 'digits:16'],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string', 'max:32'],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'pendidikan_id'                     => ['nullable', 'numeric'],
            'pekerjaan_id'                      => ['nullable', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'status_perkawinan_id'              => ['required', 'numeric'],
            'status_hubungan_dalam_keluarga_id' => ['required', 'numeric'],
            'detail_dusun_id' => ['required', 'numeric'],
            'nik_ayah'                          => ['nullable', 'digits:16'],
            'nik_ibu'                           => ['nullable', 'digits:16'],
            'nama_ayah'                         => ['nullable', 'string', 'max:64'],
            'nama_ibu'                          => ['nullable', 'string', 'max:64'],
            'alamat'                            => ['nullable', 'string', 'max:191'],
        ]);
        $penduduk = Penduduk::create($attr);

        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil menambah data penduduk ' . $penduduk->nama]);
    }
    public function update(Request $request)
    {
        // dd($request->all());
        $penduduk = Penduduk::findOrFail($request->id);
        $nama = $penduduk->nama;
        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16'],
            'kk'                                => ['required', 'digits:16'],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string', 'max:32'],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'pendidikan_id'                     => ['nullable', 'numeric'],
            'pekerjaan_id'                      => ['nullable', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'status_perkawinan_id'              => ['required', 'numeric'],
            'status_hubungan_dalam_keluarga_id' => ['required', 'numeric'],
            'detail_dusun_id' => ['required', 'numeric'],
            'nik_ayah'                          => ['nullable', 'digits:16'],
            'nik_ibu'                           => ['nullable', 'digits:16'],
            'nama_ayah'                         => ['nullable', 'string', 'max:64'],
            'nama_ibu'                          => ['nullable', 'string', 'max:64'],
            'alamat'                            => ['nullable', 'string', 'max:191'],
        ]);
        $penduduk->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil mengubah data penduduk ' . $nama]);
    }
    public function delete(Request $request)
    {
        $penduduk = Penduduk::findOrFail($request->id);
        $nama = $penduduk->nama;
        $penduduk->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil menghapus data penduduk ' . $nama]);
    }


    public function store_cetak_penduduk(Request $request)
    {

        $penduduk = $this->get_data($request);
        $desa = Desa::first();
        // return $penduduk;
        return view('pdf.LaporanPenduduk', compact('penduduk', 'desa'));
    }

    public function store_laporan_penduduk(Request $request)
    {

        $penduduk = $this->get_data($request);
        $desa = Desa::first();
        $pdf = Pdf::loadView('pdf.LaporanPenduduk', ['desa' => $desa, 'penduduk' => $penduduk])->setPaper('F4', 'landscape');
        $pdfPath = 'PDF/Penduduk/LaporanPenduduk.pdf';
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
        $query = Penduduk::query();

        $query->with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }, 'golongan_darah']);
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

        if ($request->darah_id) {
            $query->where('darah_id', '=', $request->darah_id);
        }
        if ($request->agama_id) {
            $query->where('agama_id', '=', $request->agama_id);
        }
        if ($request->pendidikan_id) {
            $query->where('pendidikan_id', '=', $request->pendidikan_id);
        }
        if ($request->pekerjaan_id) {
            $query->where('pekerjaan_id', '=', $request->pekerjaan_id);
        }
        if ($request->status_hubungan_dalam_keluarga_id) {
            $query->where('status_hubungan_dalam_keluarga_id', '=', $request->status_hubungan_dalam_keluarga_id);
        }
        if ($request->status_perkawinan_id) {
            $query->where('status_perkawinan_id', '=', $request->status_perkawinan_id);
        }

        if ($request->tanggal_awal) {
            $query->where('created_at', '>=', $request->tanggal_awal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        $penduduk = $query->get();
        return $penduduk;
    }
}
