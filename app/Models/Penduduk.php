<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function detail_dusun()
    {
        return $this->belongsTo(DetailDusun::class);
    }
}
