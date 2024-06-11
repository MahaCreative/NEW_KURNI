<?php

namespace Database\Factories;

use App\Models\Agama;
use App\Models\Darah;
use App\Models\DetailDusun;
use App\Models\Pekerjaan;
use App\Models\Pendidikan;
use App\Models\Penduduk;
use App\Models\StatusHubunganDalamKeluarga;
use App\Models\StatusPerkawinan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelahiran>
 */
class KelahiranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $darah = Darah::all();
        $agama = Agama::all();
        $dusun = DetailDusun::all();
        $jk = ['1', '2'];
        $tempatDilahirkan = ['rumah sakit', 'puskesmas', 'poliklinik', 'rumah', 'lainnya'];

        return [
            'ayah_id' => rand(1, Penduduk::count()),
            'ibu_id' => rand(1, Penduduk::count()),
            'kd_kelahiran' => rand(1111111111, 55555555555),
            'kk' => rand(1111111111111, 9999999999999999),
            'nama' => $this->faker->name(),
            'jenis_kelamin' => $jk[rand(0, 1)],
            'tempat_lahir' => $this->faker->address(),
            'tanggal_lahir' => $this->faker->date(),
            'agama_id' => rand(1, count($agama) - 1),
            'darah_id' => rand(1, count($darah) - 1),
            'nik_ayah' => rand(1111111111111111, 9999999999999999),
            'nik_ibu' => rand(1111111111111111, 9999999999999999),
            'nama_ayah' => $this->faker->name(),
            'nama_ibu' => $this->faker->name(),
            'detail_dusun_id' => rand(1, count($dusun) - 1),
            'tempat_dilahirkan' => $tempatDilahirkan[rand(0, 4)],
        ];
    }
}
