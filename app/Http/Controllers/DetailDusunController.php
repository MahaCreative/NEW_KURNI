<?php

namespace App\Http\Controllers;

use App\Models\DetailDusun;
use App\Models\Dusun;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

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
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan data detail dusun baru']);
    }
    public function update(Request $request)
    {
        $detail = DetailDusun::findOrFail($request->id);
        $detail->update([
            'dusun_id' => $request->dusun_id,
            'rt' => $request->rt,
            'rw' => $request->rw,
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengubah data detail dusun']);
    }
    public function delete(Request $request)
    {

        $detail = DetailDusun::findOrFail($request->id);
        $detail->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data detail dusun']);
    }
}
