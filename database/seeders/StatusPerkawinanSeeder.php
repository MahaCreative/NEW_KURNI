<?php

namespace Database\Seeders;

use App\Models\StatusPerkawinan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusPerkawinanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StatusPerkawinan::create(['nama' => 'Belum Kawin']);
        StatusPerkawinan::create(['nama' => 'Kawin']);
        StatusPerkawinan::create(['nama' => 'Cerai Hidup']);
        StatusPerkawinan::create(['nama' => 'Cerai Mati']);
    }
}
