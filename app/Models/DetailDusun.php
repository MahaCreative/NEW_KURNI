<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailDusun extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function penduduk()
    {
        return $this->hasMany(Penduduk::class);
    }
}
