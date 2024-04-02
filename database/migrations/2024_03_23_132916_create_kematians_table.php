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
        Schema::create('kematians', function (Blueprint $table) {
            $table->id();
            $table->string('kd_kematian')->unique();
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
            $table->string('nik_ayah', 16);
            $table->string('nik_ibu', 16);
            $table->string('nama_ayah', 64);
            $table->string('nama_ibu', 64);
            $table->string('alamat');
            $table->foreignId('detail_dusun_id')->references('id')->on('detail_dusuns')->onUpdate('cascade')->onDelete('cascade');
            $table->string('hari_kematian');
            $table->date('tgl_kematian');
            $table->string('waktu_kematian')->nullable();
            $table->string('sebab_kematian');
            $table->string('tempat_kematian');
            $table->string('status_konfirmasi')->default('menggu konfirmasi');
            $table->string('foto_kk')->nullable();
            $table->string('foto_ktp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kematians');
    }
};
