<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pindah extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pengikut()
    {
        return $this->hasMany(PengikutPindah::class, 'pindah_id');
    }
    public function detail_dusun()
    {
        return $this->belongsTo(DetailDusun::class);
    }

    public function golongan_darah()
    {
        return $this->belongsTo(Darah::class, 'darah_id');
    }
    public function pekerjaan()
    {
        return $this->belongsTo(Pekerjaan::class);
    }

    public function agama()
    {
        return $this->belongsTo(Agama::class);
    }
    public function pendidikan()
    {
        return $this->belongsTo(Pendidikan::class);
    }


    public function statusHubunganDalamKeluarga()
    {
        return $this->belongsTo(StatusHubunganDalamKeluarga::class);
    }

    public function statusPerkawinan()
    {
        return $this->belongsTo(StatusPerkawinan::class);
    }
}
