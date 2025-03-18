<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VolumeCalculation;

class VolumeCalculationController extends Controller
{
    // Mengambil data volume calculation berdasarkan item_pekerjaan_id dan satuan (unit)
    public function index(Request $request)
    {
        $itemId = $request->query('item_pekerjaan_id'); // ambil parameter yang dikirim dari JS
        $unit = $request->query('unit');
        // Pastikan query memakai nama kolom 'item_pekerjaan_id' sesuai dengan migrasi
        $calculations = VolumeCalculation::where('item_pekerjaan_id', $itemId)
            ->where('satuan', $unit)
            ->get();
        return response()->json($calculations);
    }

    // Menyimpan perhitungan volume baru
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'item_pekerjaan_id' => 'nullable|exists:item_pekerjaans,id',
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
                'calculation_type'  => 'required|in:plus,minus',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $calculation = VolumeCalculation::create($validated);

        return response()->json([
            'message' => 'Perhitungan volume berhasil disimpan.',
            'data'    => $calculation,
        ]);
    }
    public function show($id)
    {
        $calculation = VolumeCalculation::find($id);
        if (!$calculation) {
            return response()->json(['message' => 'Data tidak ditemukan.'], 404);
        }
        return response()->json($calculation);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'item_pekerjaan_id' => 'nullable|exists:item_pekerjaans,id',
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
            'calculation_type'  => 'required|in:plus,minus',
        ]);

        $calculation = VolumeCalculation::findOrFail($id);
        $calculation->update($validated);

        return response()->json([
            'message' => 'Perhitungan volume berhasil diupdate.',
            'data'    => $calculation,
        ]);
    }
    public function destroy($id)
    {
        try {
            $calculation = VolumeCalculation::findOrFail($id);
            $calculation->delete();
            return response()->json(['message' => 'Perhitungan volume berhasil dihapus.']);
        } catch (\Exception $e) {
            // Log error jika perlu: \Log::error($e->getMessage());
            return response()->json(['message' => 'Gagal menghapus perhitungan volume.'], 500);
        }
    }
}
