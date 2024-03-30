<?php

namespace App\Http\Controllers;

use App\Models\Kematian;
use App\Models\Penduduk;
use Illuminate\Http\Request;

class KematianController extends Controller
{
    public function index(Request $request)
    {
        $query = Kematian::query();

        $kematian = $query->with(['agama', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->get();
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
}
