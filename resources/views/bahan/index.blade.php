@extends('layouts.app')

@section('content')
<div class="container mx-auto p-6 max-w-[1080px]">
  <h1 class="text-2xl font-bold mb-4 text-center">Daftar Harga Satuan Bahan</h1>

  @if(session('success'))
  <div class="bg-green-200 text-green-800 p-2 rounded mb-4">
    {{ session('success') }}
  </div>
  @endif

  <!-- Tombol Tambah Bahan -->
  <button onclick="openBahanModal(false)" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
    <i class="fas fa-plus-circle"></i> Tambah Bahan
  </button>

  <!-- Tabel Data Bahan -->
  <div class="overflow-y-auto max-h-[620px]">
    <table class="text-sm min-w-full bg-white border">
      <thead class="bg-blue-200 sticky top-0 z-10">
        <tr>
          <th class="py-2 px-4 border">No.</th>
          <th class="py-2 px-4 border">Uraian Bahan</th>
          <th class="py-2 px-4 border">Satuan</th>
          <th class="py-2 px-4 border">Harga Bahan (Rp)</th>
          <th class="py-2 px-4 border">Sumber</th>
          <th class="py-2 px-4 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        @foreach($bahans as $index => $bahan)
        <tr>
          <td class="py-2 px-4 border text-center">{{ $index + 1 }}</td>
          <td class="py-2 px-4 border">{{ $bahan->uraian_bahan }}</td>
          <td class="py-2 px-4 border">{{ $bahan->satuan }}</td>
          <td class="py-2 px-4 border">Rp {{ number_format($bahan->harga_bahan, 2) }}</td>
          <td class="py-2 px-4 border">{{ $bahan->sumber }}</td>
          <td class="py-2 px-4 border text-center">
            <!-- Tombol Action untuk Context Menu -->
            <button type="button" 
                    class="action-btn px-4 text-blue-500 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                    data-id="{{ $bahan->id }}"
                    data-uraian="{{ $bahan->uraian_bahan }}"
                    data-satuan="{{ $bahan->satuan }}"
                    data-harga="{{ $bahan->harga_bahan }}"
                    data-sumber="{{ $bahan->sumber }}"
                    data-module="bahan">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </td>
        </tr>
        @endforeach
        @if($bahans->isEmpty())
        <tr>
          <td colspan="6" class="py-2 px-4 border text-center">Tidak ada data.</td>
        </tr>
        @endif
      </tbody>
    </table>
  </div>
</div>

<!-- Modal Bahan (gunakan Blade component atau markup langsung) -->
<x-modal id="bahanModal" title="Tambah Bahan">
  <form id="bahanForm" method="POST" action="{{ route('bahan.store') }}" data-original-action="{{ route('bahan.store') }}">
    @csrf
    <div class="mb-4">
      <label for="uraian_bahan" class="block font-medium">Uraian Bahan</label>
      <input type="text" id="uraian_bahan" name="uraian_bahan" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="satuan_bahan" class="block font-medium">Satuan</label>
      <input type="text" id="satuan_bahan" name="satuan" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="harga_bahan" class="block font-medium">Harga Bahan</label>
      <input type="number" step="0.01" id="harga_bahan" name="harga_bahan" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="sumber_bahan" class="block font-medium">Sumber</label>
      <input type="text" id="sumber_bahan" name="sumber" class="w-full border px-3 py-2 rounded">
    </div>
    <div class="flex justify-end">
      <button type="button" onclick="closeBahanModal()" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Batal</button>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
    </div>
  </form>
</x-modal>

<!-- Context Menu (bisa ditempatkan di layout atau di akhir file) -->
<div id="context-menu" class="hidden absolute bg-white shadow-lg rounded-md py-2 w-32 border border-gray-200 z-50">
  <button onclick="handleEdit(this)" class="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100 hover:text-blue-900 text-sm flex items-center edit-btn">
    <i class="fas fa-edit mr-2 w-4 h-4"></i> Edit
  </button>
  <button onclick="handleDelete(this)" class="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center hover:text-red-900 text-red-500 delete-btn">
    <i class="fas fa-trash-alt mr-2 w-4 h-4"></i> Hapus
  </button>
</div>
@endsection

@section('scripts')
<script>
  window.csrfToken = '{{ csrf_token() }}';
</script>
@vite(['resources/js/modal.js'])
@endsection
