<?php

// Contoh UpahObserver.php
namespace App\Observers;

use App\Models\Upah;
use App\Models\AhspDetail;

class UpahObserver
{
    public function updated(Upah $upah)
    {
        // Pastikan nilai dari data master sudah benar
        logger()->info('Upah updated', [
            'uraian_upah' => $upah->uraian_upah,
            'satuan'       => $upah->satuan,
            'harga'  => $upah->harga,
        ]);

        // Ambil semua detail yang terkait dengan item master ini
        $details = AhspDetail::where('item_id', $upah->id)
            ->where('kategori', 'upah')
            ->get();

        foreach ($details as $detail) {
            $detail->harga_dasar = $upah->harga;
            // Update item_text dengan uraian_upah dari data master
            $detail->item_text = $upah->uraian_upah;
            // Update satuan dengan nilai satuan dari data master
            $detail->satuan = $upah->satuan;
            // Recalculate harga_satuan berdasarkan koefisien
            $detail->harga_satuan = $upah->harga * $detail->koefisien;
            $detail->save();
        }
    }
}
