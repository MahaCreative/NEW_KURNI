<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('desas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_desa', 64);
            $table->string('nama_kecamatan', 64);
            $table->string('nama_kabupaten', 64);
            $table->string('alamat', 191);
            $table->string('nama_kepala_desa', 64);
            $table->string('alamat_kepala_desa', 64);
            $table->string('logo', 64);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desas');
    }
};
