<?php

use App\Http\Controllers\ApiPendudukController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataKartuKeluargaController;
use App\Http\Controllers\DesaController;
use App\Http\Controllers\DetailDusunController;
use App\Http\Controllers\DusunController;
use App\Http\Controllers\GrafikController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KelahiranController;
use App\Http\Controllers\KematianController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\PermintaanKelahiran;
use App\Http\Controllers\PindahController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\DetailDusun;
use App\Models\Dusun;
use App\Models\Penduduk;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

Route::get('', [HomeController::class, 'index'])->name('home');
Route::post('permintaan-suket-kelahiran/cek-data-orang-tua', [PermintaanKelahiran::class, 'cek_data_orang_tua'])->name('permintaan-kelahiran-cek-data-orang-tua');
Route::post('permintaan-suket-kelahiran', [PermintaanKelahiran::class, 'store'])->name('permintaan-kelahiran');
Route::post('permintaan-suket-kematian', [KematianController::class, 'permintaan_kematian'])->name('post-permintaan-kematian');
Route::post('cek-data-penduduk', [KematianController::class, 'cek_penduduk'])->name('cek_penduduk');
Route::post('permintaan-pindah-masuk', [PindahController::class, 'permintaan_pindah_masuk'])->name('permintaan-pindah-masuk');
Route::post('permintaan-pindah-keluar', [PindahController::class, 'permintaan_pindah_keluar'])->name('permintaan-pindah-keluar');



Route::post('login', function (Request $request) {
    // dd($request->all());
    $attr = $request->validate([
        'email' => "email|required|string",
        'password' => "confirmed|min:6",
    ]);

    $credentials = $request->only('email', 'password');
    if (Auth::attempt($credentials)) {
        // Autentikasi berhasil
        return redirect()->route('dashboard');
    }
    return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal login, masukkan password dan email yang benar']);
})->name('login');


Route::get('logout', function () {
    Auth::logout();
    return redirect()->route('home');
})->name('logout');
Route::get('grafik-penduduk', [GrafikController::class, 'index'])->name('grafik');
Route::middleware(['auth'])->group(function () {

    Route::post('update-profile', function (Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => 'required|string',
            "email" => 'required|email|unique:users,email,' . $request->id,
            "password" => 'nullable|min:6',
            "alamat" => 'required|string|min:12',
            "telp" => 'required|numeric|min:12',
            "dusun" => 'nullable',
            "foto" => 'nullable',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->with(['type' => 'error', 'message' => $validator->errors()->all()])->withErrors($validator)->withInput();
        }
        $foto = '';
        $user = User::findOrFail($request->id);
        if ($request->hasFile('foto')) {
            $request->validate([
                'foto' => 'image|mimes:jpg,jpeg,svg,png'
            ]);
            $foto = $request->file('foto')->store('User/Profil/Foto');
        } else {
            $foto = $user->foto;
        }

        $dusun = '';
        if ($request->jabatan == 'kepala dusun') {
            $dusun = $request->dusun;
        }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'alamat' => $request->alamat,
            'telp' => $request->telp,
            'jabatan' => $request->jabatan,
            'dusun' => $dusun,
            'foto' => $foto,
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil mengubah data user']);
    })->name('setting-profile');

    Route::get('user', [UserController::class, 'index'])->name('user');
    Route::post('create-user', [UserController::class, 'store'])->name('create-user');
    Route::post('update-user', [UserController::class, 'update'])->name('update-user');
    Route::delete('delete-user/', [UserController::class, 'delete'])->name('delete-user');




    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('desa', [DesaController::class, 'index'])->name('desa');
    Route::post('update-desa', [DesaController::class, 'update'])->name('update.desa');
    Route::post('update-foto-desa', [DesaController::class, 'update_foto_desa'])->name('update-foto.desa');


    Route::get('dusun', [DusunController::class, 'index'])->name('dusun');
    Route::post('create-dusun', [DusunController::class, 'store'])->name('post.dusun');
    Route::post('update-dusun', [DusunController::class, 'update'])->name('update.dusun');
    Route::delete('delete-dusun/', [DusunController::class, 'delete'])->name('delete.dusun');

    Route::post('create-detail-dusun', [DetailDusunController::class, 'store'])->name('post.detail-dusun');
    Route::post('update-detail-dusun', [DetailDusunController::class, 'update'])->name('update.detail-dusun');
    Route::delete('delete-detail-dusun/', [DetailDusunController::class, 'delete'])->name('delete.detail-dusun');


    Route::get('data-kartu-keluarga', [DataKartuKeluargaController::class, 'index'])->name('data-kartu-keluarga');
    Route::get('data-kartu-keluarga/{kk}', [DataKartuKeluargaController::class, 'per_kk'])->name('kk.data-kartu-keluarga');
    Route::get('laporan-data-kartu-keluarga', [DataKartuKeluargaController::class, 'index'])->name('laporan.data-kartu-keluarga');
    Route::get('export-laporan-data-kartu-keluarga', [DataKartuKeluargaController::class, 'export_laporan'])->name('export.laporan.data-kartu-keluarga');
    Route::get('cetak-laporan-data-kartu-keluarga', [DataKartuKeluargaController::class, 'cetak_laporan'])->name('cetak.laporan.data-kartu-keluarga');

    Route::get('penduduk', [PendudukController::class, 'index'])->name('penduduk');
    Route::post('post-penduduk', [PendudukController::class, 'store'])->name('post.penduduk');
    Route::post('update-penduduk', [PendudukController::class, 'update'])->name('update.penduduk');
    Route::delete('delete-penduduk', [PendudukController::class, 'delete'])->name('delete.penduduk');
    Route::get('laporan-penduduk', [PendudukController::class, 'laporan_penduduk'])->name('laporan.penduduk');
    Route::get('export-laporan-penduduk', [PendudukController::class, 'store_laporan_penduduk'])->name('export.laporan-penduduk');
    Route::get('cetak-laporan-penduduk', [PendudukController::class, 'store_cetak_penduduk'])->name('cetak.laporan-penduduk');


    Route::get('kelahiran', [KelahiranController::class, 'index'])->name('kelahiran');
    Route::post('post-kelahiran', [KelahiranController::class, 'store'])->name('post.kelahiran');
    Route::post('update-kelahiran', [KelahiranController::class, 'update'])->name('update.kelahiran');
    Route::delete('delete-kelahiran', [KelahiranController::class, 'delete'])->name('delete.kelahiran');
    Route::post('konfirmasi-kelahiran', [KelahiranController::class, 'konfirmasi'])->name('konfirmasi.kelahiran');
    Route::get('cetak-suket-lahir/{id}', [KelahiranController::class, 'cetakSuketLahir'])->name('cetak.suket-lahir');

    Route::get('export-laporan-kelahiran', [KelahiranController::class, 'export_laporan'])->name('export.laporan-kelahiran');
    Route::get('cetak-laporan-kelahiran', [KelahiranController::class, 'cetak_laporan'])->name('cetak.laporan-kelahiran');

    Route::get('kematian', [KematianController::class, 'index'])->name('kematian');
    Route::post('post-kematian', [KematianController::class, 'store'])->name('post.kematian');
    Route::post('update-kematian', [KematianController::class, 'update'])->name('update.kematian');
    Route::delete('delete-kematian', [KematianController::class, 'delete'])->name('delete.kematian');
    Route::post('konfirmasi-kematian', [KematianController::class, 'konfirmasi'])->name('konfirmasi.kematian');
    Route::get('cetak-suket-kematian/{id}', [KematianController::class, 'cetak_suket'])->name('cetak.suket-kematian');
    Route::get('export-laporan-kematian', [KematianController::class, 'export_laporan'])->name('export.laporan-kematian');
    Route::get('cetak-laporan-kematian', [KematianController::class, 'cetak_laporan'])->name('cetak.laporan-kematian');


    Route::get('pindah', [PindahController::class, 'index'])->name('pindah');
    Route::delete('delete-pindah', [PindahController::class, 'delete'])->name('delete.pindah');

    Route::get('formulir-pindah-keluar/{id}', [PindahController::class, 'formulirPindahKeluar'])->name('formulir.pindah-keluar');
    Route::post('post-pindah-keluar', [PindahController::class, 'storeKeluar'])->name('post.pindah-keluar');
    Route::get('formulir-pindah-masuk', [PindahController::class, 'formulirPindahMasuk'])->name('formulir.pindah-masuk');
    Route::post('post-pindah-masuk', [PindahController::class, 'storemasuk'])->name('post.pindah-masuk');
    Route::post('konfirmasi-permintaan-pindah/', [PindahController::class, 'konfirmasi_permintaan_pindah'])->name('konfirmasi.permintaan-pindah');
    Route::delete('delete-pindah-penduduk', [PindahController::class, 'delete'])->name('delete.pindah');
    Route::get('cetak-suket-pindah/{id}', [PindahController::class, 'cetak_suket'])->name('cetak.suket-pindah');
    Route::get('export-laporan-pindah-penduduk', [PindahController::class, 'export_laporan'])->name('export.laporan-pindah');
    Route::get('cetak-laporan-pindah-penduduk', [PindahController::class, 'cetak_laporan'])->name('cetak.laporan-pindah');
});


Route::get('api-penduduk', [ApiPendudukController::class, 'index'])->name('api.penduduk');
Route::get('api-get-penduduk', [ApiPendudukController::class, 'allPenduduk'])->name('all-penduduk');
Route::get('api-get-penduduk-by-kk', [ApiPendudukController::class, 'getPendudukKK'])->name('get_penduduk_kk');
Route::get('api/get-detail-dusun', function (Request $request) {


    $detail = Dusun::where('nama', '=', $request->nama)->with('detail_dusun')->first();

    return response()->json($detail->detail_dusun);
});

Route::get('get-detail-dusun', function (Request $request) {
    if ($request->nama_dusun) {


        $detail = Dusun::where('nama', '=', $request->nama_dusun)->with('detail_dusun')->first();

        return response()->json($detail->detail_dusun);
    } else {
        return response()->json([]);
    }
});
