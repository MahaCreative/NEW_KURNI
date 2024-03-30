<?php

namespace Database\Factories;

use App\Models\Pindah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PengikutPindah>
 */
class PengikutPindahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'nik' => rand(111111111111, 9999999999999999),
            'nama' => $this->faker->name(),
            'status_hubungan_dalam_keluarga_id' => rand(4, 7),
        ];
    }
}
