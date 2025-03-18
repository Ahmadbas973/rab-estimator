// volumeTemplates.js
export function getHeaderHtml(satuan) {
    if (satuan === "m3") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Panjang</th>
      <th class="px-4 py-2 border">Lebar</th>
      <th class="px-4 py-2 border">Tinggi</th>
      <th class="px-4 py-2 border">Volume</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    } else if (satuan === "m2") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Panjang</th>
      <th class="px-4 py-2 border">Lebar</th>
      <th class="px-4 py-2 border">Luas</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    } else if (satuan === "m") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Panjang</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    } else if (satuan === "kg") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Panjang</th>
      <th class="px-4 py-2 border">Berat Jenis</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    } else if (satuan === "ltr") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Liter</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    } else if (satuan === "bh" || satuan === "ls" || satuan === "unit") {
        return `
      <th class="px-4 py-2 border">No.</th>
      <th class="px-4 py-2 border">Keterangan</th>
      <th class="px-4 py-2 border">Jumlah</th>
      <th class="px-4 py-2 border">Hasil</th>
      <th class="px-4 py-2 border">Aksi</th>
    `;
    }
}

export function getFormHtml(satuan) {
    if (satuan === "m3") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Panjang</label>
          <input type="number" id="vc_panjang" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Lebar</label>
          <input type="number" id="vc_lebar" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Tinggi</label>
          <input type="number" id="vc_tinggi" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Volume</label>
          <input type="number" id="vc_volume" class="w-full border rounded p-1" readonly>
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    } else if (satuan === "m2") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Panjang</label>
          <input type="number" id="vc_panjang" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Lebar</label>
          <input type="number" id="vc_lebar" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Luas</label>
          <input type="number" id="vc_luas" class="w-full border rounded p-1" readonly>
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    } else if (satuan === "m") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Panjang</label>
          <input type="number" id="vc_panjang" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    } else if (satuan === "kg") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Panjang</label>
          <input type="number" id="vc_panjang" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Berat Jenis</label>
          <input type="number" id="vc_berat_jenis" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    } else if (satuan === "ltr") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Liter</label>
          <input type="number" id="vc_liter" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    } else if (satuan === "bh" || satuan === "ls" || satuan === "unit") {
        return `
      <div class="mb-2">
          <label class="block text-sm font-medium">Keterangan</label>
          <input type="text" id="vc_keterangan" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Jumlah</label>
          <input type="number" id="vc_jumlah" class="w-full border rounded p-1">
      </div>
      <div class="mb-2">
          <label class="block text-sm font-medium">Hasil</label>
          <input type="number" id="vc_hasil" class="w-full border rounded p-1">
      </div>
    `;
    }
}
