<?php

namespace App\Http\Middleware;

use App\Models\Agama;
use App\Models\Darah;
use App\Models\Desa;
use App\Models\Dusun;
use App\Models\Pekerjaan;
use App\Models\Pendidikan;
use App\Models\StatusHubunganDalamKeluarga;
use App\Models\StatusPerkawinan;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $desa = Desa::first();
        return [
            ...parent::share($request),
            'desa' => $desa,
            'pendidikan' => Pendidikan::all(),
            'dusun' => Dusun::with('detail_dusun')->get(),
            'agama' => Agama::all(),
            'darah' => Darah::all(),
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message')
            ],
            'status_hubungan_dalam_keluarga' => StatusHubunganDalamKeluarga::all(),
            'status_perkawinan' => StatusPerkawinan::all(),
            'pekerjaan' => Pekerjaan::all(),
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ? $request->user()->getRoleNames()[0] : []
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
