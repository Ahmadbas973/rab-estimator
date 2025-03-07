<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rab;

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

    /** 
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
