<?php

namespace App\Observers;

use App\Models\AhspDetail;
use App\Models\Ahs;

class AhspDetailObserver
{
    /**
     * Dipanggil setelah data detail disimpan (create/update).
     */
    public function saved(AhspDetail $detail)
    {
        $this->updateAhsGrandTotal($detail->ahs_id);
    }

    /**
     * Dipanggil setelah data detail dihapus.
     */
    public function deleted(AhspDetail $detail)
    {
        $this->updateAhsGrandTotal($detail->ahs_id);
    }

    /**
     * Fungsi untuk menghitung ulang grand_total berdasarkan semua detail terkait.
     *
     * Perhitungan:
     *   total_detail = SUM(harga_satuan) dari semua detail yang terkait dengan AHSP tersebut.
     *   overhead = total_detail * (overhead / 100)
     *   grand_total = total_detail + overhead
     *
     * @param int $ahsId
     */
    protected function updateAhsGrandTotal($ahsId)
    {
        $ahs = \App\Models\Ahs::find($ahsId);
        if ($ahs) {
            // Konversi ke float untuk memastikan tipe data angka
            $totalDetail = (float)$ahs->details()->sum('harga_satuan');
            $overheadPercent = (float)$ahs->overhead;
            $overhead = $totalDetail * ($overheadPercent / 100);
            $grandTotal = $totalDetail + $overhead;

            // Jika perlu, lakukan pembulatan ke 2 desimal
            $ahs->grand_total = round($grandTotal, 2);
            $ahs->save();
        }
    }
}
