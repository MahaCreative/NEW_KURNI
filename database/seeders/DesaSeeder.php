<?php

namespace Database\Seeders;

use App\Models\Desa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DesaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Desa::create([
            'nama_desa'         => 'Desa ANU',
            'nama_kecamatan'    => 'ANUu',
            'nama_kabupaten'    => 'ANUu',
            'alamat'            => 'ANUUUUU',
            'nama_kepala_desa'  => "ANU SSS",
            'alamat_kepala_desa' => "anussss",
            'logo'              => "Image/favicon.png",
        ]);
    }
}
