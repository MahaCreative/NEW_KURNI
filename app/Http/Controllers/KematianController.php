<?php

namespace App\Http\Controllers;

use App\Mail\EmailSuketKelahiran;
use App\Models\Desa;
use App\Models\Kematian;
use App\Models\Penduduk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Svg\Tag\Rect;

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
        $penduduk->delete();
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
        
        if ($request->konfirmasi !== null) {
            $kematian->update(['status_konfirmasi' => $request->konfirmasi]);
            if ($kematian->email) {
                $data = [
                    'id' => $kematian->id,
                    'title' => 'Konfirmasi Surat Keterangan Kematian',
                    'subjek' => 'Surat Keterangan Kematian',
                    'nama_penerima' => $kematian->nama,
                    'link' => route('cetak.suket-kematian', $kematian->id),
                    'status_permintaan' => $kematian->status_konfirmasi,
                    'link_permintaan' => route('home'),
                    'desa' => Desa::first(),
                ];
                $penduduk = Penduduk::where('kk', $kematian->kk)->where('nik', $kematian->nik)->first();
                $penduduk->delete();

                // Mail::to($kematian->email)->send(new EmailSuketKelahiran($data));
            }
        }
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

    public function permintaan_kematian(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'nik'                               => ['required', 'digits:16' ],
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
            'tgl_kematian' => ['required', 'date', 'after:now'],
            'waktu_kematian' => ['nullable'],
            'sebab_kematian' => ['required', 'string', 'min:5'],
            'tempat_kematian' => ['nullable', 'string'],
            'foto_ktp' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'foto_kk' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors(['type' => 'error', 'message' => $validator->errors()->all()]);
        }
        $data = Penduduk::where('kk', '=', $request->kk)->where('nik', '=', $request->nik)
            ->first();
        if ($data == null) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }
        $foto_kk = $request->file('foto_kk') ? $request->file('foto_kk')->store('DataKematian') : null;
        $foto_ktp = $request->file('foto_ktp') ? $request->file('foto_ktp')->store('DataKematian') : null;
        $kematian = Kematian::create([
            'kd_kematian' => now()->format('ymd') . Kematian::count() + 1,
            'email' => $request->email,
            'nik' => $data->nik,
            'kk' => $data->kk,
            'nama' => $data->nama,
            'jenis_kelamin' => $data->jenis_kelamin,
            'tempat_lahir' => $data->tempat_lahir,
            'tanggal_lahir' => $data->tanggal_lahir,
            'agama_id' => $data->agama_id,
            'pendidikan_id' => $data->pendidikan_id,
            'pekerjaan_id' => $data->pekerjaan_id,
            'darah_id' => $data->darah_id,
            'status_perkawinan_id' => $data->status_perkawinan_id,
            'status_hubungan_dalam_keluarga_id' => $data->status_hubungan_dalam_keluarga_id,
            'nik_ayah' => $data->nik_ayah,
            'nik_ibu' => $data->nik_ibu,
            'nama_ayah' => $data->nama_ayah,
            'nama_ibu' => $data->nama_ibu,
            'alamat' => $data->alamat,
            'detail_dusun_id' => $data->detail_dusun_id,
            'hari_kematian' => $request->hari_kematian,
            'tgl_kematian' => $request->tgl_kematian,
            'waktu_kematian' => $request->waktu_kematian,
            'sebab_kematian' => $request->sebab_kematian,
            'tempat_kematian' => $request->tempat_kematian,
            'status_konfirmasi' => $request->status_konfirmasi,
            'foto_kk' => $foto_kk,
            'foto_ktp' => $foto_ktp,
            'status_konfirmasi' => 'menunggu konfirmasi'
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengirim permintaan. Permintaan anda akan segera di cek oleh petugas desa. Setelah permintaan diterima silahkan mengecek email anda untuk mendapatkan LINK Surat Kematian']);
    }
    public function cek_penduduk(Request $request)
    {


        $data = Penduduk::with(['statusHubunganDalamKeluarga', 'detail_dusun' => function ($q) {
            $q->with('dusun');
        }])->where('kk', '=', $request->kk)->where('nik', '=', $request->nik)
            ->first();
        if ($data == null) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        } else {
            return response()->json($data);
        }
    }
}
