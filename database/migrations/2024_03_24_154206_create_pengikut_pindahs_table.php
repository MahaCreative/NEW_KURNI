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
        Schema::create('pengikut_pindahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pindah_id')->references('id')->on('pindahs')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nik', 16)->nullable()->unique();
            $table->string('nama', 64);
            $table->foreignId('status_hubungan_dalam_keluarga_id')->constrained('status_hubungan_dalam_keluargas')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengikut_pindahs');
    }
};
