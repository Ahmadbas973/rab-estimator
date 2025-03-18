<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Volume;

class VolumeController extends Controller
{
    // Simpan data volume
    public function store(Request $request)
    {
        $request->validate([
            'rab_id' => 'required|exists:rabs,id',
            'uraian_volume' => 'required|string',
            'nilai_volume' => 'required|numeric|min:0.01',
            'satuan_volume' => 'required|string',
        ]);

        Volume::create([
            'rab_id' => $request->rab_id,
            'uraian_volume' => $request->uraian_volume,
            'nilai_volume' => $request->nilai_volume,
            'satuan_volume' => $request->satuan_volume,
        ]);

        return response()->json(['success' => true, 'message' => 'Data volume berhasil disimpan']);
    }
}
