<?php

namespace App\Http\Controllers;

use App\Models\KategoriPekerjaan;
use Illuminate\Http\Request;

class KategoriPekerjaanController extends Controller
{
    // Method untuk mengambil semua data kategori
    public function all()
    {
        $kategori = KategoriPekerjaan::all();
        return response()->json($kategori);
    }

    // Method untuk menyimpan kategori baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|array',
            'kategori.*' => 'required|string|max:255',
        ]);

        $saved = [];
        foreach ($validated['kategori'] as $nama) {
            $saved[] = KategoriPekerjaan::create(['nama_kategori' => $nama]);
        }

        return response()->json([
            'message' => 'Kategori berhasil disimpan',
            'data' => $saved
        ]);
    }

    // Method untuk mengupdate kategori yang sudah ada
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:255',
        ]);

        $kategori = KategoriPekerjaan::findOrFail($id);
        $kategori->update(['nama_kategori' => $validated['nama_kategori']]);

        return response()->json([
            'message' => 'Kategori berhasil diupdate',
            'data' => $kategori
        ]);
    }

    // Method untuk menghapus kategori
    public function destroy($id)
    {
        $kategori = KategoriPekerjaan::findOrFail($id);
        $kategori->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus'
        ]);
    }

    public function updateOrder(Request $request)
    {
        $orderData = $request->input('order');
        if (!is_array($orderData)) {
            return response()->json(['message' => 'Data urutan tidak valid.'], 400);
        }

        foreach ($orderData as $item) {
            $kategori = KategoriPekerjaan::find($item['id']);
            if ($kategori) {
                $kategori->order = $item['order'];
                $kategori->save();
            }
        }

        return response()->json(['message' => 'Urutan kategori berhasil diperbarui.']);
    }
}
