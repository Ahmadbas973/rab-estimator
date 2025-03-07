<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use Illuminate\Http\Request;

class AlatController extends Controller
{
    public function index()
    {
        $alats = Alat::all();
        return view('alat.index', compact('alats'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'uraian_alat' => 'required|string',
            'satuan'      => 'required|string',
            'harga_alat'  => 'required|numeric',
            'sumber'      => 'required|string',
        ]);

        Alat::create($validated);

        return redirect()->route('alat.index')->with('success', 'Data Alat berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $alat = Alat::findOrFail($id);

        $validated = $request->validate([
            'uraian_alat' => 'required|string',
            'satuan'      => 'required|string',
            'harga_alat'  => 'required|numeric',
            'sumber'      => 'required|string',
        ]);

        $alat->update($validated);

        return redirect()->route('alat.index')->with('success', 'Data Alat berhasil diupdate.');
    }

    public function destroy($id)
    {
        $alat = Alat::findOrFail($id);
        $alat->delete();
        return redirect()->route('alat.index')->with('success', 'Data Alat berhasil dihapus.');
    }
}
