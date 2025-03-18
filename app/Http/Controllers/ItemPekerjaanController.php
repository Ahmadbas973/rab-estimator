<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ItemPekerjaan;

class ItemPekerjaanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_pekerjaan_id' => 'required|integer',
            'uraian_item'           => 'required|string',
            'satuan'                => 'required|string',
            'harga_satuan'          => 'required|numeric',
            'volume'                => 'nullable|numeric',
            'harga_total'           => 'nullable|numeric',
        ]);

        // Jika tidak diberikan, set default nilai 0
        $validated['volume'] = $validated['volume'] ?? 0;
        $validated['harga'] = $validated['harga'] ?? 0;

        $item = ItemPekerjaan::create($validated);

        return response()->json([
            'message' => 'Item pekerjaan berhasil disimpan',
            'data' => $item,
        ]);
    }

    public function destroy($id)
    {
        $item = ItemPekerjaan::findOrFail($id);
        $item->delete();
        return response()->json([
            'message' => 'Item pekerjaan berhasil dihapus'
        ]);
    }

    public function updateVolume(Request $request, $id)
    {
        $validated = $request->validate([
            'volume' => 'required|numeric',
            'harga_total' => 'required|numeric',
        ]);

        $item = ItemPekerjaan::findOrFail($id);
        $item->update($validated);

        return response()->json(['message' => 'Data volume dan harga total berhasil diperbarui.']);
    }
}
