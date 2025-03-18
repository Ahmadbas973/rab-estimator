<?php

namespace App\Http\Controllers;

use App\Models\Upah;
use Illuminate\Http\Request;

class UpahController extends Controller
{
    public function index()
    {
        // Ambil seluruh data dari tabel upahs
        $upahs = Upah::all();
        return view('upah.index', compact('upahs'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'uraian_tenaga' => 'required|string',
            'satuan'        => 'required|string',
            'harga'         => 'required|numeric',
            'sumber'        => 'nullable|string',
        ]);

        Upah::create($validated);

        return redirect()->route('upah.index')->with('success', 'Data Upah berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $upah = Upah::findOrFail($id);
        $validated = $request->validate([
            'uraian_tenaga' => 'required|string',
            'satuan'        => 'required|string',
            'harga'         => 'required|numeric',
            'sumber'        => 'nullable|string',
        ]);

        $upah->update($validated);

        return redirect()->route('upah.index')->with('success', 'Data Upah berhasil diupdate.');
    }

    public function destroy($id)
    {
        $upah = Upah::findOrFail($id);
        $upah->delete();
        return redirect()->route('upah.index')->with('success', 'Data Upah berhasil dihapus.');
    }
}
