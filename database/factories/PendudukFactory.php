<?php

namespace Database\Factories;

use App\Models\Agama;
use App\Models\Darah;
use App\Models\DetailDusun;
use App\Models\Pekerjaan;
use App\Models\Pendidikan;
use App\Models\StatusHubunganDalamKeluarga;
use App\Models\StatusPerkawinan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Penduduk>
 */
class PendudukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $darah = Darah::all();
        $pendidikan = Pendidikan::all();
        $pekerjaan = Pekerjaan::all();
        $agama = Agama::all();
        $statusPerkawinan = StatusPerkawinan::all();
        $statusHubungan = StatusHubunganDalamKeluarga::all();
        $dusun = DetailDusun::all();
        $jk = ['1', '2'];
        return [
            'nik' => rand(1111111111111111, 9999999999999999),
            'kk' => rand(1111111111111, 9999999999999999),
            'nama' => $this->faker->name(),
            'jenis_kelamin' => $jk[rand(0, 1)],
            'tempat_lahir' => $this->faker->address(),
            'tanggal_lahir' => $this->faker->date(),
            'agama_id' => rand(1, count($agama) - 1),
            'pendidikan_id' => rand(1, count($pendidikan) - 1),
            'pekerjaan_id' => rand(1, count($pekerjaan) - 1),
            'darah_id' => rand(1, count($darah) - 1),
            'status_perkawinan_id' => rand(1, count($statusPerkawinan) - 1),
            'status_hubungan_dalam_keluarga_id' => rand(1, count($statusHubungan) - 1),
            'nik_ayah' => rand(1111111111111111, 9999999999999999),
            'nik_ibu' => rand(1111111111111111, 9999999999999999),
            'nama_ayah' => $this->faker->name(),
            'nama_ibu' => $this->faker->name(),
            'alamat' => $this->faker->address(),
            'detail_dusun_id' => rand(1, count($dusun) - 1),
        ];
    }
}
