<?php

namespace App\Http\Controllers;

use App\Models\Kelahiran;
use Illuminate\Http\Request;

class KelahiranController extends Controller
{
    public function index(Request $request)
    {
        $query = Kelahiran::query();
        $kelahiran = $query->with('agama', 'golongan_darah')->paginate(40);
        return inertia('Kelahiran/Index', compact('kelahiran'));
    }
}
