<?php

namespace App\Http\Controllers;

use App\Mail\EmailSuketKelahiran;
use App\Models\Desa;
use App\Models\Kelahiran;
use App\Models\Penduduk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class KelahiranController extends Controller
{
    public function index(Request $request)
    {
        $query = Kelahiran::query()->with(['agama', 'golongan_darah', 'ayah', 'ibu', 'detail_dusun' => function ($q) {
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
        // dd($kelahiran);
        return inertia('Kelahiran/Index', compact('kelahiran'));
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
            'email' => 'nullable|email',
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
            // $query->where('status_hubungan_dalam_keluarga_id', '2')
            //     ->orWhere('status_hubungan_dalam_keluarga_id', '1');
        })->where('nik', $request->nik_ayah)
            ->where('nama', $request->nama_ayah)
            ->where('kk', '=', $request->KK)->first();
        if ($ayah == null) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => 'Data Ayah belum terdaftar, silahkan memasukkan Data Ayah yang Valid', 'lanjut' => false]);
        }
        // $ibu = Penduduk::where('status_hubungan_dalam_keluarga_id', '=', '3')
        $ibu = Penduduk::where('nik', $request->nik_ibu)
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
            'status_permintaan' => 'di terima'
        ]);
                $penduduk = Penduduk::create([
            'nik' => $request->nik,
            'kk' => $request->KK,
            'nama' => $request->nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'agama_id' => $request->agama_id,
            'pendidikan_id' => '1',
            'pekerjaan_id' => '1',
            'darah_id' => $request->darah_id,
            // 'ayah_id' => $ayah->id,
            'nik_ayah' => $request->nik_ayah,
            'nama_ayah' => $request->nama_ayah,
            'status_perkawinan_id' => 1,
            'status_hubungan_dalam_keluarga_id' => 4,
            // 'ibu_id' => $ibu->id,
            'nik_ibu' => $request->nik_ibu,
            'nama_ibu' => $request->nama_ibu,
            'alamat' => $ayah->alamat,
            'detail_dusun_id' => $ayah->detail_dusun_id,
        ]);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan data kelahiran baru']);
    }

    public function update(Request $request)
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
            'email' => 'nullable|email',
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
        $kelahiran = Kelahiran::findOrFail($request->id);
        $foto_kk = $kelahiran->foto_kk;
        $foto_ktp_ibu = $kelahiran->foto_ktp_ibu;
        $foto_ktp_ayah = $kelahiran->foto_ktp_ayah;
        $surat_keterangan_lahir = $kelahiran->surat_keterangan_lahir;
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
        $kelahiran = Kelahiran::findOrFail($request->id);
        $nama = $kelahiran->nama;
        $kelahiran->update([
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
            'status_permintaan' => 'di terima'
        ]);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data kelahiran ' . $nama]);
    }

    public function delete(Request $request)
    {
        $kelahiran = Kelahiran::findOrFail($request->id);
        $nama = $kelahiran->nama;

        $kelahiran->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data kelahiran ' . $nama]);
    }
    public function konfirmasi(Request $request)
    {

        $kelahiran = Kelahiran::findOrFail($request->id);
        $nama = $kelahiran->nama;

        if ($request->konfirmasi !== null) {
            $kelahiran->update(['status_permintaan' => $request->konfirmasi]);
            $data = Penduduk::findOrFail($kelahiran->ayah_id);
            
            if ($kelahiran->email) {
                $data = [
                    'id' => $kelahiran->id,
                    'title' => 'Konfirmasi Surat Keterangan Lahir',
                    'subjek' => 'Surat Keterangan Lahir',
                    'nama_penerima' => $kelahiran->nama,
                    'link' => route('cetak.suket-lahir', $kelahiran->id),
                    'status_permintaan' => $kelahiran->status_permintaan,
                    'link_permintaan' => route('home'),
                    'desa' => Desa::first(),
                ];
                if($request->konfirmasi == 'di terima'){
                    $ayah = Penduduk::where(function ($query) use ($request) {
                        // $query->where('status_hubungan_dalam_keluarga_id', '2')
                        //     ->orWhere('status_hubungan_dalam_keluarga_id', '1');
                    })->where('nik', $kelahiran->nik_ayah)
                        ->where('nama', $kelahiran->nama_ayah)
                        ->where('kk', '=', $kelahiran->KK)->first();
                $ibu = Penduduk::where('nik', $kelahiran->nik_ibu)
                        ->where('nama', $kelahiran->nama_ibu)
                        ->where('kk', '=', $kelahiran->KK)->first();
                    $penduduk = Penduduk::create([
                        'nik' => $kelahiran->nik,
                        'kk' => $kelahiran->KK,
                        'nama' => $kelahiran->nama,
                        'jenis_kelamin' => $kelahiran->jenis_kelamin,
                        'tempat_lahir' => $kelahiran->tempat_lahir,
                        'tanggal_lahir' => $kelahiran->tanggal_lahir,
                        'agama_id' => $kelahiran->agama_id,
                        'pendidikan_id' => '1',
                        'pekerjaan_id' => '1',
                        'darah_id' => $kelahiran->darah_id,
                        // 'ayah_id' => $ayah->id,
                        'nik_ayah' => $kelahiran->nik_ayah,
                        'nama_ayah' => $kelahiran->nama_ayah,
                        'status_perkawinan_id' => 1,
                        'status_hubungan_dalam_keluarga_id' => 4,
                        // 'ibu_id' => $ibu->id,
                        'nik_ibu' => $kelahiran->nik_ibu,
                        'nama_ibu' => $kelahiran->nama_ibu,
                        // 'tempat_dilahirkan' => $kelahiran->tempat_dilahirkan,
                        'alamat' => $ayah->alamat,
                        'detail_dusun_id' => $ayah->detail_dusun_id,
                    ]);
                }
                // Mail::to($kelahiran->email)->send(new EmailSuketKelahiran($data));
            }

            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui konfirmasi data kelahiran ' . $nama]);
        }
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

    public function export_laporan(Request $request)
    {
        $kelahiran = $this->get_data($request);
        $desa = Desa::first();
        $pdf = Pdf::loadView('pdf.LaporanDataKelahiran', ['desa' => $desa, 'kelahiran' => $kelahiran])->setPaper('F4', 'landscape');
        $pdfPath = 'PDF/Penduduk/Laporan-Data-Kelahiran.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'Laporan-Data-Kelahiran.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }

    public function cetak_laporan(Request $request)
    {
        $kelahiran = $this->get_data($request);
        $desa = Desa::first();

        return view('pdf.LaporanDataKelahiran', compact('desa', 'kelahiran'));
    }

    public function get_data($request)
    {
        $query = Kelahiran::with(['detail_dusun' => function ($q) {
            $q->with('dusun');
        }]);
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
        if ($request->tanggal_awal) {
            $query->where('tanggal_lahir', '>=', $request->tanggal_awal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tanggal_lahir', '<=', $request->sampai_tanggal);
        }
        $kk = $query->get();
        return $kk;
    }
}
