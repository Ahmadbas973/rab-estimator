@extends('layouts.app')

@section('content')
<div class="container mx-auto max-w-[1080px] p-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Analisa Harga Satuan Pekerjaan (AHSP)</h1>

    @if(session('success'))
    <div class="bg-green-200 text-green-800 p-2 rounded mb-4">
        {{ session('success') }}
    </div>
    @endif

    <!-- Tombol untuk membuka modal full form input data baru -->
    <button type="button" onclick="openFullFormModal(false)" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-4 py-2 rounded mb-4">
        <i class="fas fa-plus-circle"></i> Tambah Analisa
    </button>

    <!-- Tabel View Data dari Tabel "ahs" -->
    <div class="overflow-y-auto max-h-[620px]">
        <table class="text-sm min-w-full bg-white border">
            <thead class="bg-blue-200 sticky top-0 z-10">
                <tr>
                    <th class="py-2 px-4 border">No.</th>
                    <th class="py-2 px-4 border">Kode Analisa</th>
                    <th class="py-2 px-4 border">Uraian Pekerjaan</th>
                    <th class="py-2 px-4 border">Satuan</th>
                    <th class="py-2 px-4 border">Harga Satuan Pekerjaan</th>
                    <th class="py-2 px-4 border">Overhead (%)</th>
                    <th class="py-2 px-4 border">Sumber</th>
                    <th class="py-2 px-4 border">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @php $no = 1; @endphp
                @foreach($ahsRecords as $record)
                <tr class="hover:bg-gray-50" data-id="{{ $record->id }}" data-judul="{{ $record->judul }}">
                    <td class="py-2 px-4 border text-center">{{ $no++ }}</td>
                    <td class="py-2 px-4 border">{{ $record->kode }}</td>
                    <td class="py-2 px-4 border">{{ $record->judul }}</td>
                    <td class="py-2 px-4 border">{{ $record->satuan }}</td>
                    <td class="py-2 px-4 border text-right">Rp {{ number_format($record->grand_total, 2) }}</td>
                    <td class="py-2 px-4 border text-center">{{ number_format($record->overhead, 2) }} %</td>
                    <td class="py-2 px-4 border">{{ $record->sumber }}</td>
                    <td class="py-2 px-4 border text-center space-x-2">
                        <!-- Tombol Tiga Titik untuk Context Menu -->
                        <button type="button" 
                                class="action-btn px-4 text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100"
                                data-id="{{ $record->id }}"
                                data-kode="{{ $record->kode }}"
                                data-judul="{{ $record->judul }}"
                                data-satuan="{{ $record->satuan }}"
                                data-sumber="{{ $record->sumber }}"
                                title="Edit">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </td>
                </tr>
                @endforeach
                @if($ahsRecords->isEmpty())
                <tr>
                    <td colspan="4" class="p-2 border text-center">Tidak ada data.</td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>
</div>

<!-- Context Menu -->
<div id="context-menu" class="hidden absolute bg-white shadow-lg rounded-md py-2 w-32 border border-gray-200 z-50">
    <button onclick="handleEdit(this)" 
            class="w-full px-4 py-2 text-left text-blue-500 hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center edit-btn">
        <i class="fas fa-edit mr-2 w-4 h-4"></i> Edit
    </button>
    <button onclick="handleDelete(this)" 
            class="w-full px-4 py-2 text-left hover:bg-blue-100 text-sm flex items-center hover:text-red-700 text-red-500 delete-btn">
        <i class="fas fa-trash-alt mr-2 w-4 h-4"></i> Hapus
    </button>
</div>

<!-- Modal AHSP khusus (menggunakan Blade Component aHS Modal) -->
<x-ahs-modal />

@endsection

@section('scripts')
<script>
  // Inisialisasi variabel global dari controller
  window.bahanItems = @json($bahanItems);
  window.upahItems = @json($upahItems);
  window.alatItems = @json($alatItems);
  window.ahsBaseUrl = '{{ url("ahs") }}';
  window.ahsDetailStoreRoute = '{{ route("ahs.detail.store") }}';
  window.csrfToken = '{{ csrf_token() }}';
</script>
@vite(['resources/js/modal.js', 'resources/js/ahsp.js'])
@endsection
