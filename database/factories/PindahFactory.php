<?php

namespace Database\Factories;

use App\Models\Desa;
use App\Models\DetailDusun;
use App\Models\Dusun;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pindah>
 */
class PindahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dusun = Dusun::all();
        $detail = DetailDusun::all();
        $desa = Desa::first();
        $kategori = ['keluar', 'masuk'];
        $konfirmasi = ['di terima', 'di tolak', 'menunggu konfirmasi'];
        return [
            'email' => $this->faker->email(),
            'nik' => rand(1111111111111, 999999999999999),
            'kk' => rand(1111111111111, 999999999999999),
            'nama' => $this->faker->name(),
            'jenis_kelamin' => rand(1, 2),
            'tempat_lahir' => $this->faker->name(),
            'tanggal_lahir' => $this->faker->date(),
            'agama_id' => rand(1, 5),
            'pendidikan_id' => rand(1, 5),
            'pekerjaan_id' => rand(1, 5),
            'darah_id' => rand(1, 5),
            'status_perkawinan_id' => rand(1, 3),
            'status_hubungan_dalam_keluarga_id' => rand(1, 5),
            'desa_asal' => $desa->nama_desa,
            'dusun_asal' => $dusun[rand(1, count($dusun) - 1)]->nama,
            'rt_asal' => $detail[rand(1, count($detail) - 1)]->rt,
            'rw_asal' => $detail[rand(1, count($detail) - 1)]->rw,
            'alamat_asal' => $this->faker->address(),
            'desa_tujuan' => $this->faker->name(),
            'dusun_tujuan' => $this->faker->name(),
            'rt_tujuan' => '00' . rand(0, 5),
            'rw_tujuan' => '00' . rand(0, 5),
            'alamat_tujuan' => $this->faker->address(),
            'tgl_pindah' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'alasan_pindah' => $this->faker->word(),
            'kategori_pindah' => $kategori[rand(0, 1)],
            'menunggu_konfirmasi' => $konfirmasi[rand(0, count($konfirmasi) - 1)],
        ];
    }
}
