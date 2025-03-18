// resources/js/ahsrab.js

// Objek global untuk menyimpan state modal AHSP Rab
window.AhsRab = {
    currentCategory: null,
    currentItemId: null, // Jika diperlukan untuk edit header atau lainnya
};

/**
 * Membuka modal AHSP dan memuat data dari server berdasarkan kategori yang dipilih.
 * Menggunakan ID container modal sesuai dengan file ahs-modal.blade.php (id: fullFormModal)
 * @param {number|string} categoryId - ID kategori yang dipilih.
 */
function openAhsModal(categoryId) {
    window.AhsRab.currentCategory = categoryId;
    loadAhsData(categoryId);
    const modal = document.getElementById("fullFormModal");
    if (modal) {
        modal.classList.remove("hidden");
    } else {
        console.error("Modal dengan id 'fullFormModal' tidak ditemukan.");
    }
}

/**
 * Menutup modal AHSP.
 */
function closeFullFormModal() {
    const modal = document.getElementById("fullFormModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

/**
 * Mengambil data AHSP dari server berdasarkan kategori yang dipilih dan menampilkan ke tabel.
 * Pastikan endpoint "/ahsp-detailstrab?category_id=..." sudah ada dan mengembalikan data JSON.
 * @param {number|string} categoryId - ID kategori yang dipilih.
 */
function loadAhsData(categoryId) {
    console.log("Memuat data AHSP untuk kategori:", categoryId);
    fetch(`/ahsp-detailstrab?category_id=${categoryId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data AHSP.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data AHSP diterima:", data);
            let rowsHtml = "";
            data.forEach((detail, index) => {
                rowsHtml += `
                    <tr data-id="${detail.id}">
                        <td class="p-2 border">${index + 1}</td>
                        <td class="p-2 border">${
                            detail.uraian_pekerjaan || detail.judul || "-"
                        }</td>
                        <td class="p-2 border">${detail.koefisien || "-"}</td>
                        <td class="p-2 border">${detail.satuan || "-"}</td>
                        <td class="p-2 border">${parseFloat(
                            detail.harga_dasar
                        ).toFixed(2)}</td>
                        <td class="p-2 border">${parseFloat(
                            detail.harga_satuan
                        ).toFixed(2)}</td>
                        <td class="p-2 border text-center">
                            <button onclick="editAhsDetail(${
                                detail.id
                            })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
                        </td>
                    </tr>
                `;
            });
            const tbody = document.getElementById("ahsTableBody");
            if (tbody) {
                tbody.innerHTML = rowsHtml;
            } else {
                console.error(
                    "Elemen dengan id 'ahsTableBody' tidak ditemukan."
                );
            }
        })
        .catch((error) => {
            console.error("Error loading AHSP data:", error);
            alert("Error loading AHSP data: " + error.message);
        });
}

/**
 * Fungsi untuk mengedit detail AHSP tertentu.
 * @param {number} detailId - ID record detail AHSP.
 */
function editAhsDetail(detailId) {
    // Implementasikan logika edit detail sesuai kebutuhan, misalnya membuka form edit detail di modal.
    alert("Edit AHSP detail dengan ID: " + detailId);
}

/**
 * Fungsi yang dipanggil ketika tombol "Edit Ahsp" di halaman RAB diklik.
 * Parameter itemId dan categoryId harus dikirimkan.
 * @param {number} itemId - ID item pekerjaan.
 * @param {number|string} categoryId - ID kategori dari item tersebut.
 */
function editAhsp(itemId, categoryId) {
    window.AhsRab.currentItemId = itemId;
    openAhsModal(categoryId);
}

// Ekspor fungsi secara global
window.openAhsModal = openAhsModal;
window.closeFullFormModal = closeFullFormModal;
window.editAhsDetail = editAhsDetail;
window.editAhsp = editAhsp;
