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
        Schema::create('kelahirans', function (Blueprint $table) {
            $table->id();
            $table->string('kd_kelahiran');
            $table->string('email')->nullable();
            $table->string('nik', 16)->nullable()->unique();
            $table->string('KK');
            $table->string('nama', 64);
            $table->tinyInteger('jenis_kelamin')->comment('1: Laki-laki, 2: Perempuan');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->foreignId('agama_id')->constrained('agamas')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('darah_id')->references('id')->on('darahs')->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('ayah_id')->references('id')->on('penduduks')->onUpdate('cascade')->onDelete('cascade');
            $table->string('nik_ayah', 16);
            $table->string('nama_ayah', 64);
            $table->foreignId('ibu_id')->references('id')->on('penduduks')->onUpdate('cascade')->onDelete('cascade');
            $table->string('nik_ibu', 16);
            $table->string('nama_ibu', 64);

            $table->string('tempat_dilahirkan')->nullable();
            $table->string('status_permintaan')->default('menunggu_konfirmasi');
            $table->foreignId('detail_dusun_id')->references('id')->on('detail_dusuns')->onUpdate('cascade')->onDelete('cascade');
            $table->string('foto_kk')->nullable();
            $table->string('foto_ktp_ibu')->nullable();
            $table->string('foto_ktp_ayah')->nullable();
            $table->string('surat_keterangan_lahir')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelahirans');
    }
};
