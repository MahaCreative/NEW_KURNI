<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dusun extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function detail_dusun()
    {
        return $this->hasMany(DetailDusun::class);
    }
}
