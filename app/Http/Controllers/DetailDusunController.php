<?php

namespace App\Http\Controllers;

use App\Models\DetailDusun;
use Illuminate\Http\Request;

class DetailDusunController extends Controller
{
    //

    public function store(Request $request)
    {
        // dd($request->all());
        $detail = DetailDusun::create([
            'dusun_id' => $request->dusun_id,
            'rt' => $request->rt,
            'rw' => $request->rw,

        ]);
    }
    public function update(Request $request)
    {
        $detail = DetailDusun::findOrFail($request->id);
        $detail->update([
            'dusun_id' => $request->dusun_id,
            'rt' => $request->rt,
            'rw' => $request->rw,
        ]);
    }
    public function delete(Request $request)
    {

        $detail = DetailDusun::findOrFail($request->id);
        $detail->delete();
    }
}
