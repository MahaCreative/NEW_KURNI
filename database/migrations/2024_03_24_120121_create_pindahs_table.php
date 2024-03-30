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
        Schema::create('pindahs', function (Blueprint $table) {
            $table->id();
            $table->string('email')->nullable();
            $table->string('nik', 16)->nullable()->unique();
            $table->string('kk', 16);
            $table->string('nama', 64);
            $table->tinyInteger('jenis_kelamin')->comment('1: Laki-laki, 2: Perempuan');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->foreignId('agama_id')->constrained('agamas')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('pendidikan_id')->references('id')->on('pendidikans')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('pekerjaan_id')->references('id')->on('pekerjaans')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('darah_id')->references('id')->on('darahs')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('status_perkawinan_id')->constrained('status_perkawinans')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('status_hubungan_dalam_keluarga_id')->constrained('status_hubungan_dalam_keluargas')->onUpdate('cascade')->onDelete('cascade');
            $table->string('desa_asal');
            $table->string('dusun_asal');
            $table->string('rt_asal')->nullable();
            $table->string('rw_asal')->nullable();
            $table->string('alamat_asal');
            $table->string('desa_tujuan');
            $table->string('dusun_tujuan');
            $table->string('rt_tujuan')->nullable();
            $table->string('rw_tujuan')->nullable();
            $table->string('alamat_tujuan');
            $table->string('tgl_pindah');
            $table->string('alasan_pindah');
            $table->string('kategori_pindah'); //masuk atau keluar
            $table->string('menunggu_konfirmasi')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pindahs');
    }
};
