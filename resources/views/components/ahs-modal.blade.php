<div id="fullFormModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
  <div class="bg-white p-4 rounded shadow-lg w-full max-w-4xl relative">
    <!-- Tombol close modal -->
    <button type="button" onclick="closeFullFormModal()" class="absolute top-2 right-2 bg-red-500  hover:bg-red-700 hover:text-blue-100 text-white rounded-full w-8 h-8 flex items-center justify-center">
      &times;
    </button>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 " id="formTitle">Input Data AHSP</h1>
      <!-- Total Hasil -->
      <div class="border-t flex justify-center">
          <span class="font-bold mr-2">Harga Satuan</span>
      </div>      
      <!-- Label untuk Grand Total -->
      <div class="mt-4 text-center">
        <span id="grandTotalLabel" class="py-2 px-2 bg-yellow-500 font-bold text-lg border border-blue-500">Rp 0.00</span>
      </div>

      <!-- Form Input Judul AHSP, Kode dan Detail -->
      <form id="ahspForm" action="{{ route('ahs.store') }}" method="POST">
        @csrf

        <div class="mt-5 flex space-x-4">
          <div class="mt-2 font-semibold">
            <label for="kodeAHSP" class="block mb-2 font-semibold text-center">Kode:</label>
            <input type="text" id="kodeAHSP" name="kode" class="text-center hover:bg-gray-100 border w-20 p-2 mb-4" placeholder="Kode" required>
          </div>
          <div class="mt-2 font-semibold w-full">
            <label for="judulAHSP" class="block mb-2 font-semibold text-center">Judul AHSP:</label>
            <input type="text" id="judulAHSP" name="judul" class="w-full text-center hover:bg-gray-100 border p-2 mb-4" placeholder="Masukkan Judul AHSP" required>
          </div>
          <div class="mt-2 font-semibold">
            <label for="satuanAHSP" class="block mb-2 font-semibold text-center">Satuan</label>
            <input type="text" id="satuanAHSP" name="judul" class="text-center hover:bg-gray-100 border w-20 p-2 mb-4" placeholder="Satuan" required>
          </div>
          <div class="mt-2 font-semibold">
            <label for="sumberAHSP" class="block mb-2 font-semibold text-center">Sumber</label>
            <input type="text" id="sumberAHSP" name="judul" class="text-center hover:bg-gray-100 border w-30 p-2 mb-4" placeholder="Masukka Sumber" required>
          </div>
        </div>
        
        <!-- Tabel Detail AHSP -->
        <div class="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table class="text-sm w-full text-left border-collapse" id="ahspTable">
            <thead class="bg-blue-200 sticky top-0 z-10">
              <tr>
                <th class="p-2 border">No.</th>
                <th class="p-2 border">Uraian Kategori</th>
                <th class="p-2 border">Koefisien</th>
                <th class="p-2 border">Satuan</th>
                <th class="p-2 border">Harga Dasar</th>
                <th class="p-2 border">Jumlah Harga</th>
                <th class="p-2 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <!-- Kategori UPAH -->
              <tr class="bg-blue-100">
                <td colspan="6" class="p-2 font-semibold justify-between items-center">
                  A. UPAH
                </td>
                <td class="p-2 font-semibold text-center flexitems-center">
                  <button type="button" onclick="openDetailModal('Upah')" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-2 py-1 rounded">
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tbody id="tempUpah"></tbody>
              <tr class="bg-gray-100">
                <td colspan="5" class="p-2 border text-right font-semibold">TOTAL HARGA</td>
                <td id="totalUpahCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
              <!-- Kategori BAHAN -->
              <tr class="bg-blue-100">
                <td colspan="6" class="p-2 font-semibold justify-between items-center">
                  B. BAHAN
                </td>
                <td class="p-2 font-semibold text-center flexitems-center">
                  <button type="button" onclick="openDetailModal('Bahan')" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-2 py-1 rounded">
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tbody id="tempBahan"></tbody>
              <tr class="bg-gray-100">
                <td colspan="5" class="p-2 border text-right font-semibold">TOTAL HARGA</td>
                <td id="totalBahanCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
              <!-- Kategori ALAT -->
              <tr class="bg-blue-100">
                <td colspan="6" class="p-2 font-semibold justify-between items-center">
                  C. ALAT
                </td>
                <td class="p-2 font-semibold text-center flexitems-center">
                  <button type="button" onclick="openDetailModal('Alat')" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-2 py-1 rounded">
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tbody id="tempAlat"></tbody>
              <tr class="bg-gray-100">
                <td colspan="5" class="p-2 border text-right font-semibold">TOTAL HARGA</td>
                <td id="totalAlatCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
              <!-- SUMMARY -->
              <tr class="bg-blue-100">
                <td colspan="5" class="p-2 border text-left font-semibold">D. JUMLAH</td>
                <td id="subtotalCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
              <tr class="bg-blue-100">
                <td class="p-2 border text-left font-semibold">E. Overhead & Profit</td>
                <td colspan="4" class="p-2 border">
                  <input type="number" id="overheadInput" name="overhead" class="bg-blue-100 hover:bg-gray-100 border p-2 w-20 text-right" value="10" min="0" step="0.01"> %
                </td>
                <td id="overheadCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
              <tr class="bg-blue-200">
                <td colspan="5" class="p-2 border text-left font-semibold">F. Harga Satuan Pekerjaan (grand total)</td>
                <td id="grandTotalCell" class="p-2 border font-bold">Rp 0.00</td>
                <td class="p-2 border"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Tombol untuk Tambah Data dan Simpan Perubahan -->
        <div class="text-sm mt-6 flex justify-end space-x-4">
          </button>
          <button type="button" onclick="closeFullFormModal()" class="bg-gray-500 hover:bg-gray-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-times-circle"></i> Batal
          </button>
          <button id="btnTambah" type="button" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-plus-circle"></i> Tambah
          </button>
          <button id="btnUpdate" type="button" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-4 py-2 rounded hidden">
            <i class="fas fa-save"></i> Simpan Perubahan
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Popup Modal Detail Input per Kategori -->
<div id="detailModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
  <div class="bg-white p-4 rounded shadow-lg w-full max-w-md relative">
    <button type="button" onclick="closeDetailModal()" class="absolute top-2 right-2 hover:bg-red-700 hover:text-blue-100 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
      &times;
    </button>
    <h2 id="detailModalTitle" class="text-center text-xl font-bold mb-4">Tambah Detail</h2>
    <form id="detailForm" onsubmit="return false;">
      <input type="hidden" id="detailKategori" value="">
      <div class="text-sm mb-4">
        <label class="block mb-1 font-medium">Pilih Data</label>
        <select id="modalItemSelect" class="hover:bg-gray-100 border p-2 w-full" required>
          <option value="">-- Pilih Salah Satu --</option>
        </select>
      </div>
      <div class="text-sm mb-4">
        <label class="block mb-1 font-medium">Koefisien</label>
        <input type="number" step="0.01" id="modalKoefisien" class="hover:bg-gray-100 border p-2 w-full" required>
      </div>
      <!-- Fitur Text Input untuk menampilkan data lengkap item -->
      <div class="text-sm mb-4">
        <div id="dynamicInputs">
          <!-- Input dinamis akan diisi saat opsi dipilih -->
        </div>
      </div>
      <div class="text-sm flex justify-end space-x-4">
        <button type="button" onclick="closeDetailModal()" class="bg-gray-500 hover:bg-gray-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-times-circle"></i> Batal
        </button>
        <button type="button" onclick="saveDetail()" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-save"></i> Simpan Detail
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Context Menu untuk Detail Modal (hanya tampil di dalam modal full form) -->
<div id="detail-context-menu" class="hidden absolute bg-white shadow-lg rounded-md py-2 w-32 border border-gray-200 z-50">
    <button onclick="handleDetailEdit(window.currentDetail.kategori, window.currentDetail.index)" class="w-full px-4 py-2 text-left text-blue-500 hover:bg-blue-100 hover:text-blue-700 text-sm flex items-center">
        <i class="fas fa-edit mr-2"></i> Edit
    </button>
    <button onclick="handleDetailDelete(window.currentDetail.kategori, window.currentDetail.index)" class="w-full px-4 py-2 text-left hover:bg-blue-100 text-sm flex items-center hover:text-red-700 text-red-500">
        <i class="fas fa-trash-alt mr-2"></i> Hapus
    </button>
</div>


