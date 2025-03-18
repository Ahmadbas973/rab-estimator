<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AhspDetail;

class AhspController extends Controller
{
    public function getDetailsByCategory(Request $request)
    {
        $categoryId = $request->query('category_id');
        if (!$categoryId) {
            return response()->json(['message' => 'Category ID tidak diberikan.'], 400);
        }
        // Pastikan filter sesuai dengan struktur data di tabel ahsp_detailstrab
        $details = AhspDetail::where('kategori', $categoryId)->get();
        return response()->json($details);
    }
}
