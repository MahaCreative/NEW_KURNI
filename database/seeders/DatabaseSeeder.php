<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelahiran;
use App\Models\Kematian;
use App\Models\Penduduk;
use App\Models\PengikutPindah;
use App\Models\Pindah;
use App\Models\User;
use Database\Factories\PendudukFactory;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);
        $role = Role::create(['name' => 'kepala desa', 'guard_name' => 'web']);
        $user->assignRole($role->name);
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
        Penduduk::factory(500)->create();
        Kematian::factory(1)->create();
        Pindah::factory(335)->hasPengikut(3)->create();
        // Kelahiran::factory(1)->create();
    }
}
