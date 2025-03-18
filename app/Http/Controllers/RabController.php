<?php

namespace App\Http\Controllers;

use App\Models\Rab;
use Illuminate\Http\Request;
use App\Models\ItemPekerjaan;

class RabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $rabItems = Rab::all(); // Mengambil semua data dari tabel rabs
        // return view('rab.index', compact('rabItems'));

        // Misalnya, setiap kategori memiliki relasi 'items' (ItemPekerjaan)
        $kategoriPekerjaans = \App\Models\KategoriPekerjaan::with('items')->get();

        return view('rab.index', compact('kategoriPekerjaans'));
    }

    // public function updateVolume(Request $request, $id)
    // {
    //     $data = $request->validate([
    //         'volume' => 'required|numeric' 
    //     ]);

    //     // Misal model untuk item pekerjaan adalah App\Models\ItemPekerjaan
    //     $item = \App\Models\ItemPeKerjaan::findOrFail($id);
    //     $item->volume = $data['volume'];
    //     $item->save();

    //     return response()->json(['message' => 'Volume berhasil diupdate']);
    // }


    public function destroy($id)
    {
        // Cari item berdasarkan ID
        $item = ItemPekerjaan::findOrFail($id);

        // Hapus volume_calculations yang terkait dengan item ini
        $item->volumeCalculations()->delete();

        // Hapus item pekerjaan
        $item->delete();

        return redirect()->back()->with('success', 'Item dan volume terkait berhasil dihapus.');
    }
}
