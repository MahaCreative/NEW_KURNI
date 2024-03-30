<?php

namespace App\Jobs;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GeneratePdfJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    protected $desa;
    protected $penduduk;
    public function __construct($desa, $penduduk)
    {
        $this->desa = $desa;
        $this->penduduk = $penduduk;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pdf = Pdf::loadView('pdf.LaporanPenduduk', ['desa' => $this->desa, 'penduduk' => $this->penduduk])->setPaper('f4', 'landscape');
        $pdfPath = 'PDF/Penduduk/LaporanPenduduk.pdf';
        \Storage::put($pdfPath, $pdf->output());
    }
}
