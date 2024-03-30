<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelahiran extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function golongan_darah()
    {
        return $this->belongsTo(Darah::class, 'darah_id');
    }
    public function agama()
    {
        return $this->belongsTo(Agama::class);
    }
    public function ayah()
    {
        return $this->belongsTo(Penduduk::class, 'ayah_id');
    }
    public function ibu()
    {
        return $this->belongsTo(Penduduk::class, 'ibu_id');
    }
}
