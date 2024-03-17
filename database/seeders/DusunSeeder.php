<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DusunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dusuns')->insert([
            ['nama' => 'ABC'],
            ['nama' => 'DEF'],
            ['nama' => 'GHI'],
            ['nama' => 'JKL'],
            ['nama' => 'MNO'],
        ]);
    }
}
