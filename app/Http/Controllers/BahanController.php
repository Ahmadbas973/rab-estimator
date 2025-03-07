<?php

namespace App\Http\Controllers;

use App\Models\Bahan;
use Illuminate\Http\Request;

class BahanController extends Controller
{
    public function index()
    {
        $bahans = Bahan::all();
        return view('bahan.index', compact('bahans'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'uraian_bahan' => 'required|string',
            'satuan'       => 'required|string',
            'harga_bahan'  => 'required|numeric',
            'sumber'       => 'nullable|string',
        ]);

        Bahan::create($validated);

        return redirect()->route('bahan.index')->with('success', 'Data Bahan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $bahan = Bahan::findOrFail($id);

        $validated = $request->validate([
            'uraian_bahan' => 'required|string',
            'satuan'       => 'required|string',
            'harga_bahan'  => 'required|numeric',
            'sumber'       => 'nullable|string',
        ]);

        $bahan->update($validated);

        return redirect()->route('bahan.index')->with('success', 'Data Bahan berhasil diupdate.');
    }

    public function destroy($id)
    {
        $bahan = Bahan::findOrFail($id);
        $bahan->delete();
        return redirect()->route('bahan.index')->with('success', 'Data Bahan berhasil dihapus.');
    }
}
