<?php

namespace App\Http\Controllers;

use App\Models\Ahs;
use App\Models\AhspDetail;
use Illuminate\Http\Request;

class AhsController extends Controller
{
    /**
     * Menampilkan halaman summary AHS beserta data item untuk modal.
     */
    public function index()
    {
        $ahsRecords = Ahs::all();
        // Ambil data untuk modal detail input (asumsi data sudah ada di tabel bahan, upah, dan alat)
        $bahanItems = \App\Models\Bahan::all();
        $upahItems  = \App\Models\Upah::all();
        $alatItems  = \App\Models\Alat::all();

        return view('ahsp.index', compact('ahsRecords', 'bahanItems', 'upahItems', 'alatItems'));
    }

    public function all()
    {
        $ahsp = \App\Models\Ahs::all();
        return response()->json($ahsp);
    }

    /**
     * Menyimpan data detail AHS melalui Ajax.
     */
    public function storeDetail(Request $request)
    {
        $validated = $request->validate([
            'judul'     => 'required|string',
            'satuan'    => 'required|string',
            'kode'      => 'required|string',
            'overhead'  => 'required|numeric|min:0',
            'sumber'    => 'required|string',
            'detail'    => 'required|array',
        ]);

        $detailData = $validated['detail'];
        $subtotal = 0;

        foreach (['bahan', 'upah', 'alat'] as $kategori) {
            if (isset($detailData[$kategori]) && is_array($detailData[$kategori])) {
                foreach ($detailData[$kategori] as $item) {
                    $subtotal += $item['harga_satuan'];
                }
            }
        }

        $overheadPercent = $validated['overhead'];
        $overhead = $subtotal * ($overheadPercent / 100);
        $grandTotal = $subtotal + $overhead;

        // Simpan summary AHSP (termasuk judul, kode, dan grand total)
        $ahs = Ahs::create([
            'kode'        => $validated['kode'],
            'judul'       => $validated['judul'],
            'satuan'      => $validated['satuan'],
            'overhead'    => $overheadPercent,
            'grand_total' => $grandTotal,
            'sumber'      => $validated['sumber'],
        ]);

        // Simpan detail ke tabel ahsp_details (tambahkan field 'judul')
        foreach (['bahan', 'upah', 'alat'] as $kategori) {
            if (isset($detailData[$kategori]) && is_array($detailData[$kategori])) {
                foreach ($detailData[$kategori] as $item) {
                    AhspDetail::create([
                        'ahs_id'       => $ahs->id,
                        'kategori'     => $kategori,
                        'item_id'      => $item['item_id'],
                        'kode'         => $validated['kode'], // menggunakan kode summary
                        'judul'        => $validated['judul'], // simpan judul juga ke detail
                        'item_text'    => $item['item_text'] ?? '',
                        'satuan'       => $item['satuan'] ?? '',
                        'harga_dasar'  => $item['harga_dasar'] ?? 0,
                        'koefisien'    => $item['koefisien'],
                        'harga_satuan' => $item['harga_satuan'],
                    ]);
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data detail berhasil disimpan.',
            'data' => $ahs
        ]);
    }



    /**
     * Menghapus data summary AHS (dan detail terkait secara cascade).
     */
    public function destroy($id)
    {
        $ahs = Ahs::findOrFail($id);
        $ahs->delete();
        return redirect()->route('ahs.index')->with('success', 'Data AHS berhasil dihapus.');
    }

    public function getDetail($id)
    {
        $ahs = Ahs::with('details')->findOrFail($id);
        $bahan = [];
        $upah  = [];
        $alat  = [];

        foreach ($ahs->details as $detail) {
            $kategori = strtolower($detail->kategori);
            if ($kategori === 'bahan') {
                if (is_null($detail->item_text) || is_null($detail->satuan) || is_null($detail->harga_dasar)) {
                    $item = \App\Models\Bahan::find($detail->item_id);
                    if ($item) {
                        $detail->item_text = $item->uraian_bahan;
                        $detail->satuan = $item->satuan;
                        $detail->harga_dasar = $item->harga_bahan;
                    }
                }
                $bahan[] = $detail;
            } elseif ($kategori === 'upah') {
                if (is_null($detail->item_text) || is_null($detail->satuan) || is_null($detail->harga_dasar)) {
                    $item = \App\Models\Upah::find($detail->item_id);
                    if ($item) {
                        $detail->item_text = $item->uraian_tenaga;
                        $detail->satuan = $item->satuan;
                        $detail->harga_dasar = $item->harga;
                    }
                }
                $upah[] = $detail;
            } elseif ($kategori === 'alat') {
                if (is_null($detail->item_text) || is_null($detail->satuan) || is_null($detail->harga_dasar)) {
                    $item = \App\Models\Alat::find($detail->item_id);
                    if ($item) {
                        $detail->item_text = $item->uraian_alat;
                        $detail->satuan = $item->satuan;
                        $detail->harga_dasar = $item->harga_alat;
                    }
                }
                $alat[] = $detail;
            }
        }

        return response()->json([
            'kode' => $ahs->kode,
            'sumber' => $ahs->sumber,
            'overhead' => $ahs->overhead,
            'bahan' => $bahan,
            'upah'  => $upah,
            'alat'  => $alat,
        ]);
    }


    public function updateDetail(Request $request, $id)
    {
        $validated = $request->validate([
            'judul'  => 'required|string',
            'satuan'  => 'required|string',
            'kode'   => 'required|string',
            'overhead' => 'required|numeric|min:0',
            'sumber' => 'required|string',
            'detail' => 'required|array',
        ]);

        $detailData = $validated['detail'];
        $subtotal = 0;

        foreach (['bahan', 'upah', 'alat'] as $kategori) {
            if (isset($detailData[$kategori]) && is_array($detailData[$kategori])) {
                foreach ($detailData[$kategori] as $item) {
                    $subtotal += $item['harga_satuan'];
                }
            }
        }

        $overheadPercent = $validated['overhead'];
        $overhead = $subtotal * ($overheadPercent / 100);
        $grandTotal = $subtotal + $overhead;

        $ahs = Ahs::findOrFail($id);
        $ahs->update([
            'kode'        => $validated['kode'],
            'judul'       => $validated['judul'],
            'satuan'      => $validated['satuan'],
            'overhead'    => $overheadPercent,
            'grand_total' => $grandTotal,
            'sumber'      => $validated['sumber'],
        ]);

        // Hapus detail lama
        $ahs->details()->delete();

        foreach (['bahan', 'upah', 'alat'] as $kategori) {
            if (isset($detailData[$kategori]) && is_array($detailData[$kategori])) {
                foreach ($detailData[$kategori] as $item) {
                    AhspDetail::create([
                        'ahs_id'       => $ahs->id,
                        'kategori'     => $kategori,
                        'item_id'      => $item['item_id'],
                        'kode'         => $validated['kode'],
                        'judul'        => $validated['judul'],
                        'item_text'    => $item['item_text'] ?? '',
                        'satuan'       => $item['satuan'] ?? '',
                        'harga_dasar'  => $item['harga_dasar'] ?? 0,
                        'koefisien'    => $item['koefisien'],
                        'harga_satuan' => $item['harga_satuan'],
                    ]);
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data AHSP berhasil diperbarui.',
            'data' => $ahs
        ]);
    }


    // public function getDetailsByCategory(Request $request)
    // {
    //     $categoryId = $request->query('category_id');
    //     if (!$categoryId) {
    //         return response()->json(['message' => 'Category ID tidak diberikan.'], 400);
    //     }
    //     // Asumsikan bahwa di tabel "ahsp_detailstrab" kolom "kategori" menyimpan nilai kategori (misalnya, angka atau string yang sama dengan ID kategori)
    //     $details = AhspDetail::where('kategori', $categoryId)->get();
    //     return response()->json($details);
    // }
}
