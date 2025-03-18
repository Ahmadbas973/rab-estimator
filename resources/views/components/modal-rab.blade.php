<!-- resources/views/components/modal-rab.blade.php -->
<div id="rabKategoriModal" class="fixed z-10 inset-0 overflow-y-auto hidden text-sm">
    <div class="flex items-center justify-center min-h-screen">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- Modal Content: Daftar Kategori -->
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full relative">
            <div class="px-4 py-3 bg-gray-100 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Data Kategori Pekerjaan</h2>
            </div>
            <div class="px-4 py-5 sm:p-6">
                <!-- Tabel Daftar Kategori -->
                <table class="min-w-full bg-white border border-gray-200 max-h-[300px]">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-4 py-2 border">No.</th>
                            <th class="px-4 py-2 border">Kategori Pekerjaan</th>
                            <th class="px-4 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="kategoriTableBody">
                        <!-- Baris kategori akan dimuat oleh JavaScript -->
                    </tbody>
                </table>
            </div>
            <div class="px-4 py-3 bg-gray-100 border-t border-gray-200 flex justify-end">
                <button type="button" onclick="openInputKategoriModal()" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Tambah Kategori</button>
                <button type="button" onclick="closeKategoriModal()" class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded ml-2">Selesai</button>
            </div>
            <!-- Context Menu untuk kategori -->
            <div id="kategori-context-menu" class="absolute hidden bg-white border rounded shadow-md z-30 text-sm">
                <ul>
                    <li>
                        <button type="button" onclick="editKategori()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </li>
                    <li>
                        <button type="button" onclick="deleteKategoriContext()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            <i class="fas fa-trash-alt"></i> Hapus
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- Modal Input Kategori Baru / Edit -->
<div id="inputKategoriModal" class="fixed z-20 inset-0 overflow-y-auto hidden">
    <div class="flex items-center justify-center min-h-screen">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- Modal Content: Input Kategori -->
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
            <div class="px-4 py-3 bg-gray-100 border-b border-gray-200">
                <!-- Gunakan id untuk judul modal agar bisa diubah -->
                <h2 id="inputKategoriModalTitle" class="text-lg font-medium text-gray-900">Tambah Kategori</h2>
            </div>
            <div class="px-4 py-5 sm:p-6">
                <label for="newKategoriInput" class="block text-sm font-medium text-gray-700">Nama Kategori</label>
                <input type="text" id="newKategoriInput" class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Masukkan kategori">
            </div>
            <div class="px-4 py-3 bg-gray-100 border-t border-gray-200 flex justify-end">
                <button type="button" onclick="closeInputKategoriModal()" class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">Batal</button>
                <!-- Tombol untuk mode tambah -->
                <button id="btnTambahKategori" type="button" onclick="saveNewKategori()" class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ml-2">
                    Tambah
                </button>
                <!-- Tombol untuk mode edit, disembunyikan secara default -->
                <button id="btnSimpanPerubahanKategori" type="button" onclick="updateKategori()" class="hidden bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ml-2">
                    Simpan Perubahan
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Input Item Pekerjaan -->
<div id="inputItemModal" class="fixed z-20 inset-0 overflow-y-auto hidden">
    <div class="flex items-center justify-center min-h-screen">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- Modal Content -->
        <div class="p-4 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
            <div class="px-4 py-3 bg-gray-100 border-b border-gray-200">
                <h2 id="inputItemModalTitle" class="text-lg font-medium text-gray-900">Tambah Item Pekerjaan</h2>
            </div>
            <form id="itemForm" class="px-4 py-5 sm:p-6">
                <!-- Select Data AHSP -->
                <div class="mb-4">
                    <label for="ahspSelect" class="block text-sm font-medium text-gray-700">Pilih Data AHSP</label>
                    <select id="ahspSelect" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                        <option value="">-- Pilih AHSP --</option>
                        <!-- Option akan diisi oleh JavaScript -->
                    </select>
                </div>
                <!-- Uraian Pekerjaan -->
                <div class="mb-4">
                    <label for="uraian_item" class="block text-sm font-medium text-gray-700">Uraian Pekerjaan</label>
                    <input type="text" name="uraian_item" id="uraian_item" class="mt-1 block w-full border rounded-md p-2" placeholder="Uraian Pekerjaan">
                </div>
                <!-- Satuan -->
                <div class="mb-4">
                    <label for="satuan" class="block text-sm font-medium text-gray-700">Satuan</label>
                    <input type="text" name="satuan" id="satuan" class="mt-1 block w-full border rounded-md p-2" placeholder="Satuan" readonly>
                </div>
                <!-- Harga Satuan (dari data AHSP) -->
                <div class="mb-4">
                    <label for="harga_satuan" class="block text-sm font-medium text-gray-700">Harga Satuan</label>
                    <input type="number" name="harga_satuan" id="harga_satuan" class="mt-1 block w-full border rounded-md p-2" readonly>
                </div>
            </form>
            <div class="px-4 py-3 bg-gray-100 border-t border-gray-200 flex justify-end">
                <button type="button" onclick="closeItemModal()" class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">Batal</button>
                <button type="button" onclick="saveItemPekerjaan()" class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ml-2">Simpan</button>
            </div>
        </div>
    </div>
</div>


