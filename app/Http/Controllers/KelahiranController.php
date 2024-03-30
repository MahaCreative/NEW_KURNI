<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\Kelahiran;
use App\Models\Penduduk;
use Illuminate\Http\Request;

class KelahiranController extends Controller
{
    public function index(Request $request)
    {
        $query = Kelahiran::query();
        $kelahiran = $query->with('agama', 'golongan_darah', 'ayah', 'ibu')->paginate(40);
        return inertia('Kelahiran/Index', compact('kelahiran'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16', 'unique:kelahirans,nik'],
            'KK'                                => ['required', 'digits:16'],
            'nik'                               => ['required', 'unique:kelahirans,nik'],
            'KK'                                => ['required',],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string', 'max:32'],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'nik_ayah'                          => ['nullable', 'digits:16'],
            'nik_ibu'                           => ['nullable', 'digits:16'],
            'nama_ayah'                         => ['nullable', 'string', 'max:64'],
            'nama_ibu'                          => ['nullable', 'string', 'max:64'],
            'tempat_dilahirkan' => ['required', "in:rumah sakit, puskesmas,poliklinik,lainnya"],
        ]);
        $data = Penduduk::findOrFail($request->ayah_id);
        $attr['kd_kelahiran'] = now()->format('dmy') . Kelahiran::count() + 1;
        $attr['status_permintaan'] = 'di terima';
        $attr['ayah_id'] = $request->ayah_id;
        $attr['ibu_id'] = $request->ibu_id;
        $attr['detail_dusun_id'] = $data->detail_dusun_id;
        $kelahiran = Kelahiran::create($attr);
        $penduduk = Penduduk::create([
            'nik'  => $request->nik,
            'kk'  => $request->KK,
            'nama'  => $request->nama,
            'jenis_kelamin'  => $request->jenis_kelamin,
            'tempat_lahir'  => $request->tempat_lahir,
            'tanggal_lahir'  => $request->tanggal_lahir,
            'agama_id'  => $request->agama_id,
            'pendidikan_id'  => 1,
            'pekerjaan_id'  => 1,
            'darah_id'  => $request->darah_id,
            'status_perkawinan_id'  => 1,
            'status_hubungan_dalam_keluarga_id'  => 4,
            'nik_ayah'  => $request->nik_ayah,
            'nik_ibu'  => $request->nik_ibu,
            'nama_ayah'  => $request->nama_ayah,
            'nama_ibu'  => $request->nama_ibu,
            'alamat'  => $data->alamat,
            'detail_dusun_id'  => $data->detail_dusun_id,
        ]);
    }

    public function update(Request $request)
    {

        $attr = $request->validate([
            'nik'                               => ['required', 'digits:16'],
            // 'KK'                                => ['required', 'digits:16'],
            'nama'                              => ['required', 'string', 'max:64'],
            'jenis_kelamin'                     => ['required', 'numeric'],
            'tempat_lahir'                      => ['required', 'string', 'max:32'],
            'tanggal_lahir'                     => ['required', 'date',],
            'agama_id'                          => ['required', 'numeric'],
            'darah_id'                          => ['nullable', 'numeric'],
            'nik_ayah'                          => ['nullable', 'digits:16'],
            'nik_ibu'                           => ['nullable', 'digits:16'],
            'nama_ayah'                         => ['nullable', 'string', 'max:64'],
            'nama_ibu'                          => ['nullable', 'string', 'max:64'],
            'tempat_dilahirkan' => ['required', "in:rumah sakit, puskesmas,poliklinik,lainnya"],
        ]);
        $kelahiran = Kelahiran::findOrFail($request->id);
        $data = Penduduk::findOrFail($request->ayah_id);
        $nama = $kelahiran->nama;
        $attr['ayah_id'] = $request->ayah_id;
        $attr['ibu_id'] = $request->ibu_id;
        $attr['detail_dusun_id'] = $data->detail_dusun_id;
        $ubahData = Penduduk::where('nik_ibu', $kelahiran->nik_ibu)
            ->where('nik_ayah', $kelahiran->nik_ayah)
            ->where('tempat_lahir', $kelahiran->tempat_lahir)
            ->where('tanggal_lahir', $kelahiran->tanggal_lahir)
            ->where('nama', $kelahiran->nama)
            ->first();

        $data = Penduduk::findOrFail($request->ayah_id);

        $ubahData->update([
            'nik'  => $request->nik,
            'kk'  => $request->KK,
            'nama'  => $request->nama,
            'jenis_kelamin'  => $request->jenis_kelamin,
            'tempat_lahir'  => $request->tempat_lahir,
            'tanggal_lahir'  => $request->tanggal_lahir,
            'agama_id'  => $request->agama_id,
            'pendidikan_id'  => 1,
            'pekerjaan_id'  => 1,
            'darah_id'  => $request->darah_id,
            'status_perkawinan_id'  => 1,
            'status_hubungan_dalam_keluarga_id'  => 4,
            'nik_ayah'  => $request->nik_ayah,
            'nik_ibu'  => $request->nik_ibu,
            'nama_ayah'  => $request->nama_ayah,
            'nama_ibu'  => $request->nama_ibu,
            'alamat'  => $data->alamat,
            'detail_dusun_id'  => $data->detail_dusun_id,
        ]);
        $kelahiran->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data kelahiran ' . $nama]);
    }

    public function delete(Request $request)
    {
        $kelahiran = Kelahiran::findOrFail($request->id);
        $nama = $kelahiran->nama;
        $ubahData = Penduduk::where('nik_ibu', $kelahiran->nik_ibu)
            ->where('nik_ayah', $kelahiran->nik_ayah)
            ->where('tempat_lahir', $kelahiran->tempat_lahir)
            ->where('tanggal_lahir', $kelahiran->tanggal_lahir)
            ->where('nama', $kelahiran->nama)
            ->first();
        if ($ubahData) {
            $ubahData->delete();
        }
        $kelahiran->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data kelahiran ' . $nama]);
    }
    public function konfirmasi(Request $request)
    {
        $kelahiran = Kelahiran::findOrFail($request->id);
        $nama = $kelahiran->nama;

        // dd($request->all());
        $kelahiran->update(['status_permintaan' => $request->konfirmasi]);
        $data = Penduduk::findOrFail($kelahiran->ayah_id);
        if ($request->konfirmasi === 'di terima') {

            $penduduk = Penduduk::create([
                'nik'  => $kelahiran->nik,
                'kk'  => $kelahiran->KK,
                'nama'  => $kelahiran->nama,
                'jenis_kelamin'  => $kelahiran->jenis_kelamin,
                'tempat_lahir'  => $kelahiran->tempat_lahir,
                'tanggal_lahir'  => $kelahiran->tanggal_lahir,
                'agama_id'  => $kelahiran->agama_id,
                'pendidikan_id'  => 1,
                'pekerjaan_id'  => 1,
                'darah_id'  => $kelahiran->darah_id,
                'status_perkawinan_id'  => 1,
                'status_hubungan_dalam_keluarga_id'  => 4,
                'nik_ayah'  => $kelahiran->nik_ayah,
                'nik_ibu'  => $kelahiran->nik_ibu,
                'nama_ayah'  => $kelahiran->nama_ayah,
                'nama_ibu'  => $kelahiran->nama_ibu,
                'alamat'  => $data->alamat,
                'detail_dusun_id'  => $data->detail_dusun_id,
            ]);
        } else {
            $hapusPenduduk = Penduduk::where('nik_ibu', $kelahiran->nik_ibu)
                ->where('nik_ayah', $kelahiran->nik_ayah)
                ->where('tempat_lahir', $kelahiran->tempat_lahir)
                ->where('tanggal_lahir', $kelahiran->tanggal_lahir)
                ->where('nik_ayah', $kelahiran->nik_ayah)
                ->where('nama', $kelahiran->nama)
                ->first();
            if ($hapusPenduduk) {

                $hapusPenduduk->delete();
            }
        }


        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui konfirmasi data kelahiran ' . $nama]);
    }

    public function cetakSuketLahir(Request $request)
    {

        $penduduk = Kelahiran::with(['agama', 'ayah' => function ($q) {
            $q->with('pekerjaan', 'agama');
        }, 'ibu' => function ($q) {
            $q->with('pekerjaan', 'agama');
        }])->findOrFail($request->id);
        // dd($kelahiran);
        return inertia('Kelahiran/CetakSuket', compact('penduduk'));
    }
}
