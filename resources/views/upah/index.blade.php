@extends('layouts.app')

@section('content')
<div class="container mx-auto max-w-[1080px] p-6">
  <h1 class="text-2xl font-bold mb-4 text-center">Daftar Harga Satuan Upah</h1>

  @if(session('success'))
    <div class="bg-green-200 text-green-800 p-2 rounded mb-4">
      {{ session('success') }}
    </div>
  @endif

  <!-- Tombol Tambah Upah -->
  <button onclick="openUpahModal(false)" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
    <i class="fas fa-plus-circle"></i> Tambah Upah
  </button>

  <!-- Tabel Data Upah -->
  <div class="overflow-y-auto max-h-[620px]">
    <table class="text-sm min-w-full bg-white border">
      <thead class="bg-blue-200 sticky top-0 z-10">
        <tr>
          <th class="py-2 px-4 border">No.</th>
          <th class="py-2 px-4 border">Uraian Tenaga</th>
          <th class="py-2 px-4 border">Satuan</th>
          <th class="py-2 px-4 border">Harga Upah (Rp)</th>
          <th class="py-2 px-4 border">Sumber</th>
          <th class="py-2 px-4 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        @foreach($upahs as $index => $upah)
        <tr>
          <td class="py-2 px-4 border text-center">{{ $index + 1 }}</td>
          <td class="py-2 px-4 border">{{ $upah->uraian_tenaga }}</td>
          <td class="py-2 px-4 border">{{ $upah->satuan }}</td>
          <td class="py-2 px-4 border">Rp {{ number_format($upah->harga, 2) }}</td>
          <td class="py-2 px-4 border">{{ $upah->sumber }}</td>
          <td class="py-2 px-4 border text-center">
            <!-- Tombol Action untuk Context Menu -->
            <button type="button"
                    class="action-btn px-4 text-blue-500 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                    data-id="{{ $upah->id }}"
                    data-uraian="{{ $upah->uraian_tenaga }}"
                    data-satuan="{{ $upah->satuan }}"
                    data-harga="{{ $upah->harga }}"
                    data-sumber="{{ $upah->sumber }}"
                    data-module="upah">
              <i class="fas fa-ellipsis-v"></i>
            </button>

          </td>
        </tr>
        @endforeach
        @if($upahs->isEmpty())
        <tr>
          <td colspan="6" class="py-2 px-4 border text-center">Tidak ada data.</td>
        </tr>
        @endif
      </tbody>
    </table>
  </div>
</div>

<!-- Context Menu -->
<div id="context-menu" class="hidden absolute bg-white shadow-lg rounded-md py-2 w-32 border border-gray-200 z-50">
  <button onclick="handleEdit(this)" class="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100 hover:text-blue-900 text-sm flex items-center edit-btn">
    <i class="fas fa-edit mr-2 w-4 h-4"></i> Edit
  </button>
  <button onclick="handleDelete(this)" class="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center hover:text-red-900 text-red-500 delete-btn">
    <i class="fas fa-trash-alt mr-2 w-4 h-4"></i> Hapus
  </button>
</div>

<!-- Modal Upah -->
<x-modal id="upahModal" title="Tambah Upah">
  <form id="upahForm" method="POST" action="{{ route('upah.store') }}" data-original-action="{{ route('upah.store') }}">
    @csrf
    <div class="mb-4">
      <label for="uraian_tenaga" class="block font-medium">Uraian Tenaga</label>
      <input type="text" id="uraian_tenaga" name="uraian_tenaga" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="satuan_upah" class="block font-medium">Satuan</label>
      <input type="text" id="satuan_upah" name="satuan" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="harga_upah" class="block font-medium">Harga Upah</label>
      <input type="number" step="0.01" id="harga_upah" name="harga" class="w-full border px-3 py-2 rounded" required>
    </div>
    <div class="mb-4">
      <label for="sumber_upah" class="block font-medium">Sumber</label>
      <input type="text" id="sumber_upah" name="sumber" class="w-full border px-3 py-2 rounded">
    </div>
    <div class="flex justify-end">
      <button type="button" onclick="closeUpahModal()" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Batal</button>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
    </div>
  </form>
</x-modal>

@endsection

@section('scripts')
<script>
  window.csrfToken = '{{ csrf_token() }}';
</script>
@vite(['resources/js/modal.js'])
@endsection
