<!-- Modal rabVolumeModal -->
<div id="rabVolumeModal" class="fixed z-20 inset-0 overflow-y-auto hidden">
  <div class="flex items-center justify-center min-h-screen">
    <!-- Overlay -->
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl transform transition-all {{-- sm:max-w-3xl sm:w-full --}} text-sm p-4">
      <div class="px-4 py-3  border-b">
        <h1 class="text-2xl font-bold mb-4 ">Perhitungan Volume</h2>
      </div>
      <!-- Total Hasil -->
      <div class="px-4 py-3 border-t flex justify-center">
          <span class="font-bold mr-2">Total Volume</span>
      </div>
      <div class="px-4 py-1 flex justify-center">
        <span class="py-2 px-2 bg-yellow-500 font-bold text-lg border border-blue-500">
          <span id="totalHasil"></span>
          <span id="unitDisplay"></span>
        </span>
      </div>

      <div class="pc-3 py-3">
        <div class="overflow-x-auto max-h-[520px]">
            <table class="min-w-full border">
            <thead id="volumeTableHeader" class="bg-blue-200 sticky top-0 z-10">
                <!-- Header tabel akan dihasilkan oleh JavaScript -->
            </thead>
            <tbody id="volumeTableBody">
                <!-- Data volume akan diisi oleh JavaScript -->
            </tbody>
            </table>
        </div>
      </div>   
      
      <div class="px-4 py-3 border-t flex justify-end space-x-4"> 
        <button type="button" onclick="closeVolumeModal()" class="bg-gray-500 hover:bg-gray-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-times-circle"> </i> Batal
        </button>
        <button type="button" onclick="saveVolumeModal()" class="bg-blue-500 hover:bg-blue-700 hover:text-blue-100 text-white px-4 py-2 rounded">
            <i class="fas fa-save"> </i> Simpan Perubahan
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal inputVolumeModal untuk input data volume calculation -->
<div id="inputVolumeModal" class="fixed inset-0 hidden z-30 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen">
    <!-- Overlay -->
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <!-- Modal Content: Form Input Volume Calculation -->
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-md sm:w-full">
      <div class="px-4 py-3 bg-gray-100 border-b">
        <h2 id="inputVolumeModalTitle" class="text-lg font-medium">Input Perhitungan Volume</h2>
      </div>
      <div id="volumeFormContainer" class="px-4 py-5">
        <!-- Form input akan di-generate secara dinamis sesuai satuan -->
      </div>
      <div class="px-4 py-3 border-t flex justify-end bg-gray-100">
        <button type="button" onclick="closeInputVolumeModal()" class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
          Batal
        </button>
        <button type="button" onclick="saveVolumeCalculation()" class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ml-2">
          Simpan
        </button>
      </div>
    </div>
  </div>
</div>
