@extends('layouts.app')

@section('content')
<div class="container mx-auto max-w-6xl p-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Rencana Anggaran Biaya (RAB)</h1>

    <!-- Tombol untuk membuka modal kategori -->
    <button type="button" onclick="openKategoriModal()" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4">
        Sesuaikan Kategori
    </button>


    <!-- Tabel RAB -->
    <div class="overflow-y-auto max-h-[620px]">
        <table class="text-sm min-w-full bg-white border">
            <thead class="bg-blue-200">
                <tr>
                    <th class="py-2 px-4 border">No.</th>
                    <th class="py-2 px-4 border">Uraian Pekerjaan</th>
                    <th class="py-2 px-4 border">Volume</th>
                    <th class="py-2 px-4 border">Satuan</th>
                    <th class="py-2 px-4 border">Harga Satuan</th>
                    <th class="py-2 px-4 border">Harga</th>
                    <th class="py-2 px-4 border">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($kategoriPekerjaans as $catIndex => $kategori)
                <!-- Baris Kategori (nomor huruf) -->
                <tr class="bg-blue-100 font-semibold">
                    <td class="py-2 px-4 border">{{ chr(65 + $catIndex) }}</td>
                    <td colspan="5" class="py-2 px-4 border">{{ $kategori->nama_kategori }}</td>
                    <!-- Kolom kosong untuk kategori -->
                    <td class="py-2 px-4 border text-center">
                        <button type="button" onclick="tambahItemPekerjaan({{ $kategori->id }})" class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </td>
                </tr>
                <!-- Baris Item Pekerjaan untuk kategori (nomor angka) -->
                @if($kategori->items && $kategori->items->count() > 0)
                    @foreach($kategori->items as $itemIndex => $item)
                    <tr data-item-id="{{ $item->id }}">
                        <!-- Kolom No untuk item menggunakan angka -->
                        <td class="py-2 px-4 border pl-8">{{ $itemIndex + 1 }}</td>
                        <td class="py-2 px-4 border pl-8">{{ $item->uraian_item }}</td>
                        <td class="py-2 px-4 border">{{ $item->volume }}</td>
                        <td class="py-2 px-4 border">{{ $item->satuan }}</td>
                        <td class="py-2 px-4 border" data-hargasatuan="{{ $item->harga_satuan }}">
                        Rp. {{ number_format($item->harga_satuan, 2, ',', '.') }}
                        </td>
                        <td class="py-2 px-4 border">Rp. {{ number_format($item->harga_total, 2, ',', '.') }}</td>
                        <td class="py-2 px-4 border">
                            <!-- Tombol aksi untuk item, misalnya edit/hapus item -->
                            <button onclick="openVolumeModal('{{ $item->satuan }}', {{ $item->id }}, {{ $item->harga_satuan }})" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">
                                <i class="fas fa-edit"></i> Edit Volume
                            </button>
                                <!-- Perhatikan, kami menambahkan parameter kedua untuk kategori -->
                            <button type="button" onclick="editAhsp({{ $item->id }}, {{ $kategori->id }})" class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">
                                <i class="fas fa-edit"></i> Edit Ahsp
                            </button>
                            <button type="button" onclick="deleteItem({{ $item->id }})" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                                <i class="fas fa-trash-alt"></i> Hapus
                            </button>
                        </td>
                    </tr>
                    @endforeach
                @endif
                @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Memanggil component modal RAB -->
<x-modal-rab/>
<x-modal-volume/>
<x-ahs-modal />
@endsection

@section('scripts')
@vite(['resources/js/rab.js', 'resources/js/volume.js', 'resources/js/ahsrab.js'])
@endsection