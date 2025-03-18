<?php

// Contoh BahanObserver.php
namespace App\Observers;

use App\Models\Bahan;
use App\Models\AhspDetail;

class BahanObserver
{
    public function updated(Bahan $bahan)
    {
        // Pastikan nilai dari data master sudah benar
        logger()->info('Bahan updated', [
            'uraian_bahan' => $bahan->uraian_bahan,
            'satuan'       => $bahan->satuan,
            'harga_bahan'  => $bahan->harga_bahan,
        ]);

        // Ambil semua detail yang terkait dengan item master ini
        $details = AhspDetail::where('item_id', $bahan->id)
            ->where('kategori', 'bahan')
            ->get();

        foreach ($details as $detail) {
            $detail->harga_dasar = $bahan->harga_bahan;
            // Update item_text dengan uraian_bahan dari data master
            $detail->item_text = $bahan->uraian_bahan;
            // Update satuan dengan nilai satuan dari data master
            $detail->satuan = $bahan->satuan;
            // Recalculate harga_satuan berdasarkan koefisien
            $detail->harga_satuan = $bahan->harga_bahan * $detail->koefisien;
            $detail->save();
        }
    }
}
