<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengikutPindah extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function statusHubunganDalamKeluarga()
    {
        return $this->belongsTo(StatusHubunganDalamKeluarga::class);
    }

    public function pindah()
    {
        return $this->belongsTo(Pindah::class, 'pindah_id');
    }
}
