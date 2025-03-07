<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VolumeCalculation;

class VolumeCalculationController extends Controller
{
    // Mengambil data volume calculation berdasarkan item_pekerjaan_id dan satuan (unit)
    public function index(Request $request)
    {
        $itemId = $request->query('item_pekerjaan_id');
        $unit   = $request->query('unit');

        if ($itemId && $unit) {
            $calculations = VolumeCalculation::where('item_pekerjaan_id', $itemId)
                ->where('satuan', $unit)
                ->get();
        } else {
            $calculations = VolumeCalculation::all();
        }
        return response()->json($calculations);
    }

    // Menyimpan perhitungan volume baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_pekerjaan_id' => 'nullable|integer',
            'satuan'            => 'required|string',
            'keterangan'        => 'nullable|string',
            'jumlah'            => 'nullable|numeric',
            'panjang'           => 'nullable|numeric',
            'lebar'             => 'nullable|numeric',
            'tinggi'            => 'nullable|numeric',
            'luas'              => 'nullable|numeric',
            'volume'            => 'nullable|numeric',
            'berat_jenis'       => 'nullable|numeric',
            'liter'             => 'nullable|numeric',
            'hasil'             => 'required|numeric',
        ]);

        $calculation = VolumeCalculation::create($validated);

        return response()->json([
            'message' => 'Perhitungan volume berhasil disimpan.',
            'data'    => $calculation,
        ]);
    }
}
