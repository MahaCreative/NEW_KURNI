<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Penduduk;
use Database\Factories\PendudukFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(
            [
                DesaSeeder::class,
                AgamaSeeder::class,
                DarahSeeder::class,
                PekerjaanSeeder::class,
                PendidikanSeeder::class,
                StatusHubunganDalamKeluargaSeeder::class,
                StatusPerkawinanSeeder::class,
                DusunSeeder::class,
                DetailDusunSeeder::class,
            ]
        );
        Penduduk::factory(1)->create();
    }
}
