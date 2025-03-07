<!-- Modal rabVolumeModal -->
<div id="rabVolumeModal" class="fixed inset-0 hidden z-20 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-3xl sm:w-full relative">
            <div class="px-4 py-3 bg-gray-100 border-b">
                <h2 class="text-lg font-medium">Perhitungan Volume</h2>
            </div>
            <div class="px-4 py-5">
                <table class="min-w-full border">
                    <thead class="bg-gray-100">
                        <tr id="volumeTableHeader">
                            <!-- Header tabel akan dihasilkan oleh JavaScript -->
                        </tr>
                    </thead>
                    <tbody id="volumeTableBody">
                        <!-- Data volume akan tampil di sini -->
                    </tbody>
                </table>
            </div>
            <div class="px-4 py-3 border-t flex justify-between bg-gray-100">
                <div>
                    <button type="button" onclick="addVolumeCalculation('plus')" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Penambahan Volume
                    </button>
                    <button type="button" onclick="addVolumeCalculation('minus')" class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-2">
                        Pengurangan Volume
                    </button>
                </div>
                <button type="button" onclick="closeVolumeModal()" class="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    Selesai
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
