<?php

namespace Database\Seeders;

use App\Models\Darah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DarahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Darah::create(['golongan' => 'A']);
        Darah::create(['golongan' => 'A+']);
        Darah::create(['golongan' => 'A-']);
        Darah::create(['golongan' => 'B']);
        Darah::create(['golongan' => 'B+']);
        Darah::create(['golongan' => 'B-']);
        Darah::create(['golongan' => 'O']);
        Darah::create(['golongan' => 'O+']);
        Darah::create(['golongan' => 'O-']);
        Darah::create(['golongan' => 'AB']);
        Darah::create(['golongan' => 'AB+']);
        Darah::create(['golongan' => 'AB-']);
    }
}
