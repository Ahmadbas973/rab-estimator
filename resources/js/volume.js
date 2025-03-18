import { getHeaderHtml, getFormHtml } from "./volumeTemplates.js";
import { generatePlusRows, generateMinusRows } from "./volumeLoadTemplates.js";

// Objek global untuk menyimpan data modal volume
window.VolumeModal = {
    currentSatuan: null,
    currentItemId: null,
    currentCalculationMode: null,
    editingId: null, // untuk mode edit
    hargaSatuan: 0, // tambahkan properti untuk harga satuan item yang dipilih
};

// Fungsi untuk membuka modal volume dan menyimpan data harga satuan item yang dipilih
function openVolumeModal(satuan, itemId, hargaSatuan) {
    VolumeModal.currentSatuan = satuan;
    VolumeModal.currentItemId = itemId; // Simpan ID item (rab_id)
    VolumeModal.editingId = null; // Reset mode edit
    VolumeModal.hargaSatuan = hargaSatuan; // Simpan harga satuan untuk item yang dipilih
    generateVolumeTableHeader(satuan);
    loadVolumeData();
    document.getElementById("rabVolumeModal").classList.remove("hidden");
}
window.openVolumeModal = openVolumeModal;

// Fungsi untuk menutup modal volume
function closeVolumeModal() {
    document.getElementById("rabVolumeModal").classList.add("hidden");
}
window.closeVolumeModal = closeVolumeModal;

// Fungsi menyimpan total volume dan harga_total ke database (dipanggil dari tombol Selesai)
function saveVolumeModal() {
    // Ambil total volume dari elemen "totalHasil" dan bersihkan dari karakter non-angka
    const totalText = document.getElementById("totalHasil").innerText;
    const totalVolume = parseFloat(totalText.replace(/[^\d.]/g, "")) || 0;

    // Gunakan harga satuan yang sudah disimpan di VolumeModal
    const hargaSatuan = VolumeModal.hargaSatuan || 0;

    // Debug: Cetak nilai volume dan harga satuan ke konsol
    console.log("Total Volume:", totalVolume);
    console.log("Harga Satuan:", hargaSatuan);

    // Hitung harga_total
    const hargaTotal = totalVolume * hargaSatuan;

    fetch(`/item-pekerjaans/${VolumeModal.currentItemId}/update-volume`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify({ volume: totalVolume, harga_total: hargaTotal }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal mengupdate volume.");
            }
            return response.json();
        })
        .then((result) => {
            alert(result.message);
            document.getElementById("rabVolumeModal").classList.add("hidden");
            location.reload();
        })
        .catch((error) => {
            console.error("Error updating volume:", error);
            alert("Error updating volume: " + error.message);
        });
}
window.saveVolumeModal = saveVolumeModal;

// Generate header tabel volume menggunakan template
function generateVolumeTableHeader(satuan) {
    document.getElementById("volumeTableHeader").innerHTML =
        getHeaderHtml(satuan);
}

// Fungsi untuk mengatur manual override pada input "Hasil" menggunakan event "blur".
// Jika pengguna mengisi input "Hasil" secara manual, maka semua input angka (selain "vc_keterangan" dan "vc_hasil") akan diset ke 0.
function setupManualOverride() {
    const hasilField = document.getElementById("vc_hasil");
    if (!hasilField) return;
    hasilField.addEventListener("blur", function () {
        if (hasilField.value.trim() !== "") {
            const fieldsToReset = [
                "vc_jumlah",
                "vc_panjang",
                "vc_lebar",
                "vc_tinggi",
                "vc_luas",
                "vc_berat_jenis",
                "vc_liter",
                "vc_volume",
            ];
            fieldsToReset.forEach((id) => {
                const field = document.getElementById(id);
                if (field && id !== "vc_hasil") {
                    field.value = 0;
                }
            });
        }
    });
}

// Fungsi untuk membuka form input volume (untuk tambah) sesuai tombol,
// menggunakan template dari getFormHtml dan mengatur perhitungan otomatis.
function addVolumeCalculation(mode) {
    VolumeModal.currentCalculationMode = mode; // 'plus' atau 'minus'
    VolumeModal.editingId = null; // Reset mode edit
    document.getElementById("volumeFormContainer").innerHTML = getFormHtml(
        VolumeModal.currentSatuan
    );
    document.getElementById("inputVolumeModal").classList.remove("hidden");

    if (VolumeModal.currentSatuan === "m3") {
        const panjangField = document.getElementById("vc_panjang");
        const lebarField = document.getElementById("vc_lebar");
        const tinggiField = document.getElementById("vc_tinggi");
        const volumeField = document.getElementById("vc_volume");
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        function computeVolume() {
            const panjang = parseFloat(panjangField.value) || 0;
            const lebar = parseFloat(lebarField.value) || 0;
            const tinggi = parseFloat(tinggiField.value) || 0;
            const volume = panjang * lebar * tinggi;
            volumeField.value = volume;
            computeHasil();
        }
        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const volume = parseFloat(volumeField.value) || 0;
            hasilField.value = jumlah * volume;
        }
        panjangField.addEventListener("input", computeVolume);
        lebarField.addEventListener("input", computeVolume);
        tinggiField.addEventListener("input", computeVolume);
        jumlahField.addEventListener("input", computeHasil);
    } else if (VolumeModal.currentSatuan === "m2") {
        const panjangField = document.getElementById("vc_panjang");
        const lebarField = document.getElementById("vc_lebar");
        const luasField = document.getElementById("vc_luas");
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        function computeLuas() {
            const panjang = parseFloat(panjangField.value) || 0;
            const lebar = parseFloat(lebarField.value) || 0;
            const luas = panjang * lebar;
            luasField.value = luas;
            computeHasil();
        }
        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const luas = parseFloat(luasField.value) || 0;
            hasilField.value = jumlah * luas;
        }
        panjangField.addEventListener("input", computeLuas);
        lebarField.addEventListener("input", computeLuas);
        jumlahField.addEventListener("input", computeHasil);
    } else if (VolumeModal.currentSatuan === "m") {
        const panjangField = document.getElementById("vc_panjang");
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const panjang = parseFloat(panjangField.value) || 0;
            hasilField.value = jumlah * panjang;
        }
        panjangField.addEventListener("input", computeHasil);
        jumlahField.addEventListener("input", computeHasil);
    } else if (VolumeModal.currentSatuan === "kg") {
        const panjangField = document.getElementById("vc_panjang");
        const jumlahField = document.getElementById("vc_jumlah");
        const beratJenisField = document.getElementById("vc_berat_jenis");
        const hasilField = document.getElementById("vc_hasil");

        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const panjang = parseFloat(panjangField.value) || 0;
            const beratJenis = parseFloat(beratJenisField.value) || 0;
            hasilField.value = jumlah * panjang * beratJenis;
        }
        panjangField.addEventListener("input", computeHasil);
        jumlahField.addEventListener("input", computeHasil);
        beratJenisField.addEventListener("input", computeHasil);
    } else if (VolumeModal.currentSatuan === "ltr") {
        const literField = document.getElementById("vc_liter");
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            const liter = parseFloat(literField.value) || 0;
            hasilField.value = jumlah * liter;
        }
        literField.addEventListener("input", computeHasil);
        jumlahField.addEventListener("input", computeHasil);
    } else if (["bh", "ls", "unit"].includes(VolumeModal.currentSatuan)) {
        const jumlahField = document.getElementById("vc_jumlah");
        const hasilField = document.getElementById("vc_hasil");

        function computeHasil() {
            const jumlah = parseFloat(jumlahField.value) || 0;
            hasilField.value = jumlah;
        }
        jumlahField.addEventListener("input", computeHasil);
    }
    // Pasang manual override pada input "Hasil"
    setupManualOverride();
}
window.addVolumeCalculation = addVolumeCalculation;

// Fungsi untuk menutup modal input volume calculation
function closeInputVolumeModal() {
    document.getElementById("inputVolumeModal").classList.add("hidden");
}
window.closeInputVolumeModal = closeInputVolumeModal;

// Fungsi untuk menyimpan data volume calculation (baru atau update)
function saveVolumeCalculation() {
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
        item_pekerjaan_id: VolumeModal.currentItemId,
        satuan: VolumeModal.currentSatuan,
        keterangan: keterangan,
        jumlah: jumlah,
        hasil: hasil,
        calculation_type: VolumeModal.currentCalculationMode, // 'plus' atau 'minus'
    };

    if (VolumeModal.currentSatuan === "m3") {
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
    } else if (VolumeModal.currentSatuan === "m2") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
        data.lebar = document.getElementById("vc_lebar")
            ? parseFloat(document.getElementById("vc_lebar").value) || 0
            : 0;
        data.luas = document.getElementById("vc_luas")
            ? parseFloat(document.getElementById("vc_luas").value) || 0
            : 0;
    } else if (VolumeModal.currentSatuan === "m") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
    } else if (VolumeModal.currentSatuan === "kg") {
        data.panjang = document.getElementById("vc_panjang")
            ? parseFloat(document.getElementById("vc_panjang").value) || 0
            : 0;
        data.berat_jenis = document.getElementById("vc_berat_jenis")
            ? parseFloat(document.getElementById("vc_berat_jenis").value) || 0
            : 0;
    } else if (VolumeModal.currentSatuan === "ltr") {
        data.liter = document.getElementById("vc_liter")
            ? parseFloat(document.getElementById("vc_liter").value) || 0
            : 0;
    }
    console.log("Data yang dikirim:", data);
    let url = "/volume-calculations";
    let method = "POST";
    if (VolumeModal.editingId) {
        url = `/volume-calculations/${VolumeModal.editingId}`;
        method = "PUT";
    }
    fetch(url, {
        method: method,
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
            VolumeModal.editingId = null;
            closeInputVolumeModal();
            loadVolumeData();
        })
        .catch((error) => {
            console.error("Error saving volume calculation:", error);
            alert("Terjadi kesalahan saat menyimpan perhitungan volume.");
        });
}
window.saveVolumeCalculation = saveVolumeCalculation;

// Fungsi untuk menghapus data volume calculation
function deleteVolumeCalculation(id) {
    if (confirm("Anda yakin ingin menghapus perhitungan volume ini?")) {
        fetch(`/volume-calculations/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Gagal menghapus perhitungan volume.");
                }
                return response.json();
            })
            .then((result) => {
                alert(result.message);
                loadVolumeData();
            })
            .catch((error) => {
                console.error("Error deleting volume calculation:", error);
                alert("Terjadi kesalahan saat menghapus perhitungan volume.");
            });
    }
}
window.deleteVolumeCalculation = deleteVolumeCalculation;

// Fungsi untuk mengedit data volume calculation
function editVolumeCalculation(id) {
    fetch(`/volume-calculations/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data perhitungan volume.");
            }
            return response.json();
        })
        .then((calc) => {
            addVolumeCalculation(calc.calculation_type);
            document.getElementById("vc_keterangan").value =
                calc.keterangan || "";
            document.getElementById("vc_jumlah").value = calc.jumlah || "";
            if (VolumeModal.currentSatuan === "m3") {
                document.getElementById("vc_panjang").value =
                    calc.panjang || "";
                document.getElementById("vc_lebar").value = calc.lebar || "";
                document.getElementById("vc_tinggi").value = calc.tinggi || "";
                document.getElementById("vc_volume").value = calc.volume || "";
            } else if (VolumeModal.currentSatuan === "m2") {
                document.getElementById("vc_panjang").value =
                    calc.panjang || "";
                document.getElementById("vc_lebar").value = calc.lebar || "";
                document.getElementById("vc_luas").value = calc.luas || "";
            } else if (VolumeModal.currentSatuan === "kg") {
                document.getElementById("vc_panjang").value =
                    calc.panjang || "";
                document.getElementById("vc_berat_jenis").value =
                    calc.berat_jenis || "";
            } else if (VolumeModal.currentSatuan === "ltr") {
                document.getElementById("vc_liter").value = calc.liter || "";
            }
            document.getElementById("vc_hasil").value = calc.hasil || "";
            VolumeModal.currentCalculationMode = calc.calculation_type;
            VolumeModal.editingId = id;
            document
                .getElementById("inputVolumeModal")
                .classList.remove("hidden");
        })
        .catch((error) => {
            console.error("Error editing volume calculation:", error);
            alert("Terjadi kesalahan saat mengambil data untuk diedit.");
        });
}
window.editVolumeCalculation = editVolumeCalculation;

// Fungsi untuk mengambil data volume calculation dan mengisi tabel
function loadVolumeData() {
    const itemId = VolumeModal.currentItemId;
    const unit = VolumeModal.currentSatuan;
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
            let totalPlus = 0;
            let totalMinus = 0;
            const plusData = data.filter(
                (calc) => calc.calculation_type === "plus"
            );
            const minusData = data.filter(
                (calc) => calc.calculation_type === "minus"
            );

            const plusTemplate = generatePlusRows(plusData, unit);
            const minusTemplate = generateMinusRows(minusData, unit);

            const rows = plusTemplate.rows + minusTemplate.rows;
            totalPlus = plusTemplate.totalPlus;
            totalMinus = minusTemplate.totalMinus;

            tbody.innerHTML = rows;

            // Di dalam loadVolumeData() setelah perhitungan:
            const numericTotal = (totalPlus - totalMinus).toFixed(2);
            document.getElementById("totalHasil").innerText = numericTotal;
            // Misalnya, tampilkan satuan di span terpisah:
            document.getElementById("unitDisplay").innerText =
                VolumeModal.currentSatuan;
        })
        .catch((error) => {
            console.error("Error loading volume data:", error);
            alert("Error loading volume data: " + error.message);
        });
}
window.loadVolumeData = loadVolumeData;
