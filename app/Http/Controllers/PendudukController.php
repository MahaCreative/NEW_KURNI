<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use App\Models\StatusHubunganDalamKeluarga;
use Illuminate\Http\Request;

class PendudukController extends Controller
{
    public function index(Request $request)
    {
        $query = Penduduk::query();

        $penduduk = $query->with([
            'golongan_darah',
            'pekerjaan',
            'pendidikan',
            'statusHubunganDalamKeluarga',
            'statusPerkawinan', 'agama', 'detail_dusun' => function ($q) {
                $q->with('dusun');
            }
        ])->paginate(50);
        $jumlahPenduduk = Penduduk::count();
        $jumlahKepalaKeluarga = StatusHubunganDalamKeluarga::withCount('penduduk')->where('nama', 'kepala keluarga')->first();
        $jumlahLakiLaki = Penduduk::where('jenis_kelamin', '=', 1)->count();
        $jumlahPerempuan = Penduduk::where('jenis_kelamin', '=', 2)->count();


        return inertia('Penduduk/Index', compact('penduduk', 'jumlahPenduduk', 'jumlahKepalaKeluarga', 'jumlahLakiLaki', 'jumlahPerempuan'));
    }

    public function store(Request $request)
    {

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
        $penduduk = Penduduk::create($attr);
        return redirect()->back();
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
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $penduduk = Penduduk::findOrFail($request->id);
        $nama = $penduduk->nama;
        $penduduk->delete();
        return redirect()->back();
    }
}
