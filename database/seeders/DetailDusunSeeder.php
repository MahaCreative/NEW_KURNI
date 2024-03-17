<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DetailDusunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('detail_dusuns')->insert([
            [
                'dusun_id' => '1',
                'rw' => '001',
                'rt' => '001',
            ],
            [
                'dusun_id' => '1',
                'rw' => '002',
                'rt' => '002',
            ],
            [
                'dusun_id' => '2',
                'rw' => '001',
                'rt' => '001',
            ],
            [
                'dusun_id' => '2',
                'rw' => '002',
                'rt' => '002',
            ],
            [
                'dusun_id' => '3',
                'rw' => '001',
                'rt' => '001',
            ],
            [
                'dusun_id' => '3',
                'rw' => '002',
                'rt' => '002',
            ],
            [
                'dusun_id' => '4',
                'rw' => '001',
                'rt' => '001',
            ],
            [
                'dusun_id' => '4',
                'rw' => '002',
                'rt' => '002',
            ],
            [
                'dusun_id' => '5',
                'rw' => '001',
                'rt' => '001',
            ],
            [
                'dusun_id' => '5',
                'rw' => '002',
                'rt' => '002',
            ],

        ]);
    }
}
