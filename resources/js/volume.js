// Membuka modal volume dan generate header tabel sesuai satuan
function openVolumeModal(satuan) {
    window.currentSatuan = satuan;
    generateVolumeTableHeader(satuan);
    loadVolumeData();
    document.getElementById("rabVolumeModal").classList.remove("hidden");
}
window.openVolumeModal = openVolumeModal;

// Menutup modal volume dan me-refresh halaman
function closeVolumeModal() {
    document.getElementById("rabVolumeModal").classList.add("hidden");
    location.reload();
}
window.closeVolumeModal = closeVolumeModal;

// Generate header tabel volume sesuai satuan
function generateVolumeTableHeader(satuan) {
    const headerRow = document.getElementById("volumeTableHeader");
    let headerHtml = "";
    switch (satuan) {
        case "m3":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Panjang</th>
                <th class="px-4 py-2 border">Lebar</th>
                <th class="px-4 py-2 border">Tinggi</th>
                <th class="px-4 py-2 border">Volume</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        case "m2":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Panjang</th>
                <th class="px-4 py-2 border">Lebar</th>
                <th class="px-4 py-2 border">Luas</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        case "m":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Panjang</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        case "kg":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Panjang</th>
                <th class="px-4 py-2 border">Berat Jenis</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        case "bh":
        case "ls":
        case "Unit":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        case "ltr":
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Liter</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
            break;
        default:
            headerHtml = `
                <th class="px-4 py-2 border">Keterangan</th>
                <th class="px-4 py-2 border">Jumlah</th>
                <th class="px-4 py-2 border">Hasil</th>
            `;
    }
    headerRow.innerHTML = headerHtml;
}

// Membuka form input volume baru sesuai tombol (Penambahan atau Pengurangan Volume)
function addVolumeCalculation(mode) {
    // mode "plus" atau "minus" bisa disimpan di variabel global jika diperlukan
    const container = document.getElementById("volumeFormContainer");
    let formHtml = "";
    switch (window.currentSatuan) {
        case "m3":
            formHtml = `
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
            break;
        case "m2":
            formHtml = `
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
            break;
        case "m":
            formHtml = `
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
            break;
        case "kg":
            formHtml = `
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
            break;
        case "ltr":
            formHtml = `
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
            break;
        case "bh":
        case "ls":
        case "Unit":
            formHtml = `
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
            break;
        default:
            formHtml = `
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
    container.innerHTML = formHtml;
    document.getElementById("inputVolumeModal").classList.remove("hidden");

    // Tambahkan perhitungan khusus untuk satuan m3
    if (window.currentSatuan === "m3") {
        const panjangField = document.getElementById("vc_panjang");
        const lebarField = document.getElementById("vc_lebar");
        const tinggiField = document.getElementById("vc_tinggi");
        const volumeField = document.getElementById("vc_volume");
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        // Fungsi untuk menghitung volume = Panjang * Lebar * Tinggi
        function computeVolume() {
            const panjang = parseFloat(panjangField.value) || 0;
            const lebar = parseFloat(lebarField.value) || 0;
            const tinggi = parseFloat(tinggiField.value) || 0;
            const volume = panjang * lebar * tinggi;
            volumeField.value = volume;
            computeHasil();
        }
        // Fungsi untuk menghitung hasil = Jumlah * Volume
        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const volume = parseFloat(volumeField.value) || 0;
            hasilField.value = jumlah * volume;
        }
        panjangField.addEventListener("input", computeVolume);
        lebarField.addEventListener("input", computeVolume);
        tinggiField.addEventListener("input", computeVolume);
        jumlahField.addEventListener("input", computeHasil);
    }
}
window.addVolumeCalculation = addVolumeCalculation;

// Fungsi untuk menutup modal input volume calculation
function closeInputVolumeModal() {
    document.getElementById("inputVolumeModal").classList.add("hidden");
}
window.closeInputVolumeModal = closeInputVolumeModal;

// Fungsi untuk menyimpan volume calculation baru
function saveVolumeCalculation() {
    // Kumpulkan data dari form input volume
    const keterangan = document.getElementById("vc_keterangan")
        ? document.getElementById("vc_keterangan").value.trim()
        : "";
    const jumlah = document.getElementById("vc_jumlah")
        ? parseFloat(document.getElementById("vc_jumlah").value) || 0
        : 0;
    const hasil = document.getElementById("vc_hasil")
        ? parseFloat(document.getElementById("vc_hasil").value) || 0
        : 0;

    let data = {
        item_pekerjaan_id: window.currentItemId || null,
        satuan: window.currentSatuan || "",
        keterangan: keterangan,
        jumlah: jumlah,
        hasil: hasil,
    };

    if (window.currentSatuan === "m3") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
        data.lebar = document.getElementById("vc_lebar")
            ? parseFloat(document.getElementById("vc_lebar").value) || 0
            : 0;
        data.tinggi = document.getElementById("vc_tinggi")
            ? parseFloat(document.getElementById("vc_tinggi").value) || 0
            : 0;
        data.volume = document.getElementById("vc_volume")
            ? parseFloat(document.getElementById("vc_volume").value) || 0
            : 0;
    } else if (window.currentSatuan === "m2") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
        data.lebar = document.getElementById("vc_lebar")
            ? parseFloat(document.getElementById("vc_lebar").value) || 0
            : 0;
        data.luas = document.getElementById("vc_luas")
            ? parseFloat(document.getElementById("vc_luas").value) || 0
            : 0;
    } else if (window.currentSatuan === "m") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
    } else if (window.currentSatuan === "kg") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
        data.berat_jenis = document.getElementById("vc_berat_jenis")
            ? parseFloat(document.getElementById("vc_berat_jenis").value) || 0
            : 0;
    } else if (window.currentSatuan === "ltr") {
        data.liter = document.getElementById("vc_liter")
            ? parseFloat(document.getElementById("vc_liter").value) || 0
            : 0;
    }

    fetch("/volume-calculations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok)
                throw new Error("Gagal menyimpan perhitungan volume.");
            return response.json();
        })
        .then((result) => {
            alert(result.message);
            closeInputVolumeModal();
            loadVolumeData();
        })
        .catch((error) => {
            console.error("Error saving volume calculation:", error);
            alert("Terjadi kesalahan saat menyimpan perhitungan volume.");
        });
}
window.saveVolumeCalculation = saveVolumeCalculation;

/// Fungsi untuk mengambil data perhitungan volume dari server dan mengisi tabel
function loadVolumeData(itemId, unit) {
    console.log(
        "Memuat data perhitungan volume untuk item ID: " +
            itemId +
            " dan unit: " +
            unit
    );
    fetch(`/volume-calculations?item_pekerjaan_id=${itemId}&unit=${unit}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data volume.");
            }
            return response.json();
        })
        .then((data) => {
            const tbody = document.getElementById("volumeTableBody");
            tbody.innerHTML = ""; // Kosongkan tabel
            data.forEach((calc, index) => {
                // Misalnya, untuk unit "m3"
                let rowHtml = "";
                if (unit === "m3") {
                    rowHtml = `
                        <tr>
                            <td class="px-4 py-2 border">${calc.keterangan}</td>
                            <td class="px-4 py-2 border">${calc.jumlah}</td>
                            <td class="px-4 py-2 border">${calc.panjang}</td>
                            <td class="px-4 py-2 border">${calc.lebar}</td>
                            <td class="px-4 py-2 border">${calc.tinggi}</td>
                            <td class="px-4 py-2 border">${calc.volume}</td>
                            <td class="px-4 py-2 border">${calc.hasil}</td>
                        </tr>
                    `;
                }
                // Tambahkan kondisi untuk satuan lain jika diperlukan
                tbody.innerHTML += rowHtml;
            });
        })
        .catch((error) => {
            console.error("Error loading volume data:", error);
            alert("Error loading volume data: " + error.message);
        });
}
window.loadVolumeData = loadVolumeData;
