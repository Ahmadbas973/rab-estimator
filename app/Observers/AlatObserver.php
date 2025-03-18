<?php

// Contoh AlatObserver.php
namespace App\Observers;

use App\Models\Alat;
use App\Models\AhspDetail;

class AlatObserver
{
    public function updated(Alat $alat)
    {
        // Pastikan nilai dari data master sudah benar
        logger()->info('Alat updated', [
            'uraian_alat' => $alat->uraian_alat,
            'satuan'       => $alat->satuan,
            'harga_alat'  => $alat->harga_alat,
        ]);

        // Ambil semua detail yang terkait dengan item master ini
        $details = AhspDetail::where('item_id', $alat->id)
            ->where('kategori', 'alat')
            ->get();

        foreach ($details as $detail) {
            $detail->harga_dasar = $alat->harga_alat;
            // Update item_text dengan uraian_alat dari data master
            $detail->item_text = $alat->uraian_alat;
            // Update satuan dengan nilai satuan dari data master
            $detail->satuan = $alat->satuan;
            // Recalculate harga_alat_satuan berdasarkan koefisien
            $detail->harga_satuan = $alat->harga_alat * $detail->koefisien;
            $detail->save();
        }
    }
}
