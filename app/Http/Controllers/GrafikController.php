<?php

namespace App\Http\Controllers;

use App\Models\Agama;
use App\Models\Darah;
use App\Models\DetailDusun;
use App\Models\Dusun;
use App\Models\Pekerjaan;
use App\Models\Pendidikan;
use App\Models\Penduduk;
use App\Models\StatusPerkawinan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GrafikController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()) {
            $jabatan = $request->user()->dusun;

            if ($jabatan == null) {
                return response()->json([
                    'jumlah_kepala_keluarga' => Penduduk::where('status_hubungan_dalam_keluarga_id', 1)->count(),
                    'totalPenduduk' => Penduduk::count(),
                    'totalPerempuan' => Penduduk::where('jenis_kelamin', 2)->count(),
                    'totalLaki' => Penduduk::where('jenis_kelamin', 1)->count(),
                    'pekerjaan'     => $this->grafikPekerjaan(),
                    'pendidikan'    => $this->grafikPendidikan(),
                    'perkawinan'    => $this->grafikPerkawinan(),
                    'agama'         => $this->grafikAgama(),
                    'darah'         => $this->grafikDarah(),
                    'usia'          => $this->grafikUsia(),
                ]);
            } else {
                $dusun = Dusun::where('nama', $jabatan)->first();
                $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

                return response()->json([
                    'jumlah_kepala_keluarga' => Penduduk::whereIn('detail_dusun_id', $detail_dusun)->where('status_hubungan_dalam_keluarga_id', 1)->count(),
                    'totalPenduduk' => Penduduk::whereIn('detail_dusun_id', $detail_dusun)->count(),
                    'totalPerempuan' => Penduduk::whereIn('detail_dusun_id', $detail_dusun)->where('jenis_kelamin', 2)->count(),
                    'totalLaki' => Penduduk::whereIn('detail_dusun_id', $detail_dusun)->where('jenis_kelamin', 1)->count(),
                    'pekerjaan'     => $this->grafikPekerjaan($jabatan),
                    'pendidikan'    => $this->grafikPendidikan($jabatan),
                    'perkawinan'    => $this->grafikPerkawinan($jabatan),
                    'agama'         => $this->grafikAgama($jabatan),
                    'darah'         => $this->grafikDarah($jabatan),
                    'usia'          => $this->grafikUsia($jabatan),
                ]);
            }
        } else {
            return response()->json([
                'jumlah_kepala_keluarga' => Penduduk::where('status_hubungan_dalam_keluarga_id', 1)->count(),
                'totalPenduduk' => Penduduk::count(),
                'totalPerempuan' => Penduduk::where('jenis_kelamin', 2)->count(),
                'totalLaki' => Penduduk::where('jenis_kelamin', 1)->count(),
                'pekerjaan'     => $this->grafikPekerjaan(),
                'pendidikan'    => $this->grafikPendidikan(),
                'perkawinan'    => $this->grafikPerkawinan(),
                'agama'         => $this->grafikAgama(),
                'darah'         => $this->grafikDarah(),
                'usia'          => $this->grafikUsia(),
            ]);
        }
    }



    private function grafikPekerjaan($jabatan = null)
    {
        $data = array();
        $pekerjaan = Pekerjaan::all();
        if ($jabatan == null) {

            foreach ($pekerjaan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::wherePekerjaanId($item->id)->count()
                ];
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

            foreach ($pekerjaan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::wherePekerjaanId($item->id)->whereIn('detail_dusun_id', $detail_dusun)->count()
                ];
            }
        }
        return $data;
    }

    private function grafikPendidikan($jabatan = null)
    {
        $data = array();
        $pendidikan = Pendidikan::all();
        if ($jabatan == null) {
            foreach ($pendidikan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::wherePendidikanId($item->id)->count()
                ];
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');
            foreach ($pendidikan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::wherePendidikanId($item->id)->whereIn('detail_dusun_id', $detail_dusun)->count()
                ];
            }
        }
        return $data;
    }

    private function grafikAgama($jabatan = null)
    {
        $data = array();
        $agama = Agama::all();
        if ($jabatan == null) {
            foreach ($agama as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::whereAgamaId($item->id)->count()
                ];
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

            foreach ($agama as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::whereAgamaId($item->id)->whereIn('detail_dusun_id', $detail_dusun)->count()
                ];
            }
        }


        return $data;
    }

    private function grafikUsia($jabatan = null)
    {
        $kategori = ['0 - 4 tahun', '5 - 17 tahun', '18 - 30 tahun', '31 - 60 tahun', '60+ tahun'];
        $laki0 = 0;
        $laki1 = 0;
        $laki2 = 0;
        $laki3 = 0;
        $laki4 = 0;
        $perempuan0 = 0;
        $perempuan1 = 0;
        $perempuan2 = 0;
        $perempuan3 = 0;
        $perempuan4 = 0;
        if ($jabatan == null) {
            foreach (Penduduk::where('jenis_kelamin', 1)->get() as $penduduk) {
                $laki = (int) Carbon::parse($penduduk->tanggal_lahir)->diff(Carbon::now())->format('%y');
                if ($laki >= 0 && $laki <= 4) {
                    $laki0 += 1;
                } elseif ($laki >= 5 && $laki <= 17) {
                    $laki1 += 1;
                } elseif ($laki >= 18 && $laki <= 30) {
                    $laki2 += 1;
                } elseif ($laki >= 31 && $laki <= 60) {
                    $laki3 += 1;
                } elseif ($laki > 60) {
                    $laki4 += 1;
                }
            }

            foreach (Penduduk::where('jenis_kelamin', 2)->get() as $penduduk) {
                $perempuan = (int) Carbon::parse($penduduk->tanggal_lahir)->diff(Carbon::now())->format('%y');
                if ($perempuan >= 0 && $perempuan <= 4) {
                    $perempuan0 += 1;
                } elseif ($perempuan >= 5 && $perempuan <= 17) {
                    $perempuan1 += 1;
                } elseif ($perempuan >= 18 && $perempuan <= 30) {
                    $perempuan2 += 1;
                } elseif ($perempuan >= 31 && $perempuan <= 60) {
                    $perempuan3 += 1;
                } elseif ($perempuan > 60) {
                    $perempuan4 += 1;
                }
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

            foreach (Penduduk::where('jenis_kelamin', 1)->whereIn('detail_dusun_id', $detail_dusun)->get() as $penduduk) {
                $laki = (int) Carbon::parse($penduduk->tanggal_lahir)->diff(Carbon::now())->format('%y');
                if ($laki >= 0 && $laki <= 4) {
                    $laki0 += 1;
                } elseif ($laki >= 5 && $laki <= 17) {
                    $laki1 += 1;
                } elseif ($laki >= 18 && $laki <= 30) {
                    $laki2 += 1;
                } elseif ($laki >= 31 && $laki <= 60) {
                    $laki3 += 1;
                } elseif ($laki > 60) {
                    $laki4 += 1;
                }
            }

            foreach (Penduduk::where('jenis_kelamin', 2)->whereIn('detail_dusun_id', $detail_dusun)->get() as $penduduk) {
                $perempuan = (int) Carbon::parse($penduduk->tanggal_lahir)->diff(Carbon::now())->format('%y');
                if ($perempuan >= 0 && $perempuan <= 4) {
                    $perempuan0 += 1;
                } elseif ($perempuan >= 5 && $perempuan <= 17) {
                    $perempuan1 += 1;
                } elseif ($perempuan >= 18 && $perempuan <= 30) {
                    $perempuan2 += 1;
                } elseif ($perempuan >= 31 && $perempuan <= 60) {
                    $perempuan3 += 1;
                } elseif ($perempuan > 60) {
                    $perempuan4 += 1;
                }
            }
        }


        return [
            'kategori'          => $kategori,
            'laki'              => [$laki0, $laki1, $laki2, $laki3, $laki4],
            'perempuan'         => [$perempuan0, $perempuan1, $perempuan2, $perempuan3, $perempuan4],
        ];
    }

    private function grafikDarah($jabatan = null)
    {
        $data = array();
        $darah = Darah::all();
        if ($jabatan == null) {
            foreach ($darah as $item) {
                $data[] = [
                    'name' => $item->golongan,
                    'y' => Penduduk::whereDarahId($item->id)->count()
                ];
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

            foreach ($darah as $item) {
                $data[] = [
                    'name' => $item->golongan,
                    'y' => Penduduk::whereDarahId($item->id)->whereIn('detail_dusun_id', $detail_dusun)->count()
                ];
            }
        }


        return $data;
    }

    private function grafikPerkawinan($jabatan = null)
    {
        $data = array();
        $perkawinan = StatusPerkawinan::all();
        if ($jabatan == null) {
            foreach ($perkawinan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::whereStatusPerkawinanId($item->id)->count()
                ];
            }
        } else {
            $dusun = Dusun::where('nama', $jabatan)->first();
            $detail_dusun = DetailDusun::where('dusun_id', $dusun->id)->pluck('id');

            foreach ($perkawinan as $item) {
                $data[] = [
                    'name' => $item->nama,
                    'y' => Penduduk::whereStatusPerkawinanId($item->id)->whereIn('detail_dusun_id', $detail_dusun)->count()
                ];
            }
        }


        return $data;
    }
}
