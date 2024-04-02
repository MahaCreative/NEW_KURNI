<?php

namespace App\Http\Controllers;

use App\Models\Kelahiran;
use App\Models\Penduduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermintaanKelahiran extends Controller
{
    public function cek_data_orang_tua(Request $request)
    {
        // dd($request->all());

        $validator = Validator::make($request->all(), [
            'KK' => 'required|numeric',
            'nik_ayah' => 'required|numeric',
            'nik_ibu' => 'required|numeric',
            'nama_ayah' => 'required|min:6',
            'nama_ibu' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => $validator->errors()->all(), 'lanjut' => false]);
        } else {
            $kk = Penduduk::where('kk', $request->KK)->first();
            if ($kk == null) {
                return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Nomor Kartu Keluarga Belum Terdaftar.', 'lanjut' => false]);
            }
            $ayah = Penduduk::where(function ($query) use ($request) {
                $query->where('status_hubungan_dalam_keluarga_id', '2')
                    ->orWhere('status_hubungan_dalam_keluarga_id', '1');
            })
                ->where('nik', $request->nik_ayah)
                ->where('nama', $request->nama_ayah)
                ->where('kk', '=', $request->KK)->first();
            if ($ayah == null) {
                return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Data Ayah belum terdaftar, silahkan memasukkan Data Ayah yang Valid', 'lanjut' => false]);
            }
            $ibu = Penduduk::where('status_hubungan_dalam_keluarga_id', '=', '3')
                ->where('nik', $request->nik_ibu)
                ->where('nama', $request->nama_ibu)
                ->where('kk', '=', $request->KK)->first();
            if ($ibu == null) {
                return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Data Ibu belum terdaftar, silahkan memasukkan Data Ibu yang Valid', 'lanjut' => false]);
            }
            return redirect()->back()->withErrors(['type' => 'success', 'message' => 'Silahkan melanjutkan mengisi data formulir kelahiran', 'lanjut' => true]);
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nik'                               => ['nullable', 'digits:16', 'unique:kelahirans,nik'],
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
            'email' => 'required|email',
            'foto_kk' => 'required|image|mimes:jpg,jpeg,png,svg',
            'foto_ktp_ibu' => 'required|image|mimes:jpg,jpeg,png,svg',
            'foto_ktp_ayah' => 'required|image|mimes:jpg,jpeg,png,svg',
            'surat_keterangan_lahir' => 'nullable|image|mimes:jpg,jpeg,png,svg',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => $validator->errors()->all()]);
        }
        $kk = Penduduk::where('kk', $request->KK)->first();
        if ($kk == null) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Nomor Kartu Keluarga Belum Terdaftar.', 'lanjut' => false]);
        }
        $ayah = Penduduk::where(function ($query) use ($request) {
            $query->where('status_hubungan_dalam_keluarga_id', '2')
                ->orWhere('status_hubungan_dalam_keluarga_id', '1');
        })->where('nik', $request->nik_ayah)
            ->where('nama', $request->nama_ayah)
            ->where('kk', '=', $request->KK)->first();
        if ($ayah == null) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Data Ayah belum terdaftar, silahkan memasukkan Data Ayah yang Valid', 'lanjut' => false]);
        }
        $ibu = Penduduk::where('status_hubungan_dalam_keluarga_id', '=', '3')
            ->where('nik', $request->nik_ibu)
            ->where('nama', $request->nama_ibu)
            ->where('kk', '=', $request->KK)->first();
        if ($ibu == null) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Data Ibu belum terdaftar, silahkan memasukkan Data Ibu yang Valid', 'lanjut' => false]);
        }
        $foto_kk = null;
        $foto_ktp_ibu = null;
        $foto_ktp_ayah = null;
        $surat_keterangan_lahir = null;
        if ($request->hasFile('foto_kk')) {
            $foto_kk = $request->file('foto_kk')->store('BerkasLahiran/foto_kk');
        }
        if ($request->hasFile('foto_ktp_ibu')) {
            $foto_ktp_ibu = $request->file('foto_ktp_ibu')->store('BerkasLahiran/foto_ktp_ibu');
        }
        if ($request->hasFile('foto_ktp_ayah')) {
            $foto_ktp_ayah = $request->file('foto_ktp_ayah')->store('BerkasLahiran/foto_ktp_ayah');
        }
        if ($request->hasFile('surat_keterangan_lahir')) {
            $surat_keterangan_lahir = $request->file('surat_keterangan_lahir') ? $request->file('surat_keterangan_lahir')->store('BerkasLahiran/surat_keterangan_lahir') : null;
        }
        $kelahiran = Kelahiran::create([
            'kd_kelahiran' => now()->format('ymd') . Kelahiran::count() + 1,
            'email' => $request->email,
            'nik' => $request->nik,
            'KK' => $request->KK,
            'nama' => $request->nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'agama_id' => $request->agama_id,
            'darah_id' => $request->darah_id,
            'ayah_id' => $ayah->id,
            'nik_ayah' => $request->nik_ayah,
            'nama_ayah' => $request->nama_ayah,
            'ibu_id' => $ibu->id,
            'nik_ibu' => $request->nik_ibu,
            'nama_ibu' => $request->nama_ibu,
            'tempat_dilahirkan' => $request->tempat_dilahirkan,
            'status_permintaan' => $request->status_permintaan,
            'detail_dusun_id' => $ayah->detail_dusun_id,
            'foto_kk' => $foto_kk,
            'foto_ktp_ibu' => $foto_ktp_ibu,
            'foto_ktp_ayah' => $foto_ktp_ayah,
            'surat_keterangan_lahir' => $surat_keterangan_lahir,
            'status_permintaan' => 'menunggu konfirmasi'
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Permohonan Surat Keterangan Lahir telah diajukan, silahkan menunggu email dari petugas desa']);
    }
}
