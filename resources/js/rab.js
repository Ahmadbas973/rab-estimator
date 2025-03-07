// Fungsi untuk membuka modal daftar kategori dan memuat data dari server
function openKategoriModal() {
    loadKategoriData(); // Muat ulang data kategori
    document.getElementById("rabKategoriModal").classList.remove("hidden");
}
window.openKategoriModal = openKategoriModal;

// Fungsi untuk menutup modal daftar kategori
function closeKategoriModal() {
    document.getElementById("rabKategoriModal").classList.add("hidden");
    // Sembunyikan context menu kategori jika terbuka
    document.getElementById("kategori-context-menu").classList.add("hidden");
    // Refresh halaman RAB
    location.reload();
}
window.closeKategoriModal = closeKategoriModal;

// Fungsi untuk membuka modal input kategori (default mode tambah)
function openInputKategoriModal() {
    // Reset nilai input dan modal ke mode tambah
    document.getElementById("newKategoriInput").value = "";
    document.getElementById("inputKategoriModalTitle").innerText =
        "Tambah Kategori";
    document.getElementById("btnTambahKategori").classList.remove("hidden");
    document
        .getElementById("btnSimpanPerubahanKategori")
        .classList.add("hidden");
    document.getElementById("inputKategoriModal").classList.remove("hidden");
}
window.openInputKategoriModal = openInputKategoriModal;

// Fungsi untuk menutup modal input kategori dan mereset mode
function closeInputKategoriModal() {
    document.getElementById("inputKategoriModal").classList.add("hidden");
    // Reset modal ke mode default tambah
    document.getElementById("inputKategoriModalTitle").innerText =
        "Tambah Kategori";
    document.getElementById("btnTambahKategori").classList.remove("hidden");
    document
        .getElementById("btnSimpanPerubahanKategori")
        .classList.add("hidden");
}
window.closeInputKategoriModal = closeInputKategoriModal;

// Fungsi untuk mengambil data kategori dari server dan menampilkan ke tabel
function loadKategoriData() {
    console.log("Memuat data kategori...");
    fetch("/kategori-pekerjaan/all")
        .then((response) => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then((data) => {
            console.log("Data kategori diterima:", data);
            const tbody = document.getElementById("kategoriTableBody");
            if (!tbody) {
                console.error("Elemen kategoriTableBody tidak ditemukan.");
                return;
            }
            tbody.innerHTML = ""; // Bersihkan tabel
            data.forEach((kategori, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-4 py-2 border">${index + 1}</td>
                    <td class="px-4 py-2 border">${kategori.nama_kategori}</td>
                    <td class="px-4 py-2 border text-center text-sm">
                        <button type="button" class="action-btn-kategori bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded" 
                            data-id="${kategori.id}" data-nama="${
                    kategori.nama_kategori
                }"
                            onclick="handleKategoriContextMenu(event, this)">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error loading kategori data:", error);
        });
}
window.loadKategoriData = loadKategoriData;

// Fungsi untuk menampilkan context menu kategori dengan posisi sesuai kursor
function handleKategoriContextMenu(event, button) {
    event.preventDefault();
    event.stopPropagation(); // Mencegah klik dari menutup context menu secara otomatis

    const originalContextMenu = document.getElementById(
        "kategori-context-menu"
    );
    if (!originalContextMenu) {
        console.error("Context menu kategori tidak ditemukan.");
        return;
    }
    // Pindahkan context menu ke body (jika belum berada di sana)
    if (originalContextMenu.parentElement !== document.body) {
        document.body.appendChild(originalContextMenu);
    }

    // Ambil data kategori dari tombol
    const kategori = {
        id: button.getAttribute("data-id"),
        nama_kategori: button.getAttribute("data-nama"),
    };
    window.currentKategori = kategori;

    // Tampilkan sementara context menu untuk mendapatkan dimensinya
    originalContextMenu.classList.remove("hidden");
    const menuWidth = originalContextMenu.offsetWidth;
    const menuHeight = originalContextMenu.offsetHeight;
    originalContextMenu.classList.add("hidden");

    // Hitung posisi berdasarkan kursor
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let x = event.pageX;
    let y = event.pageY;
    if (x + menuWidth > viewportWidth) {
        x = viewportWidth - menuWidth;
    }
    if (y + menuHeight > viewportHeight) {
        y = viewportHeight - menuHeight;
    }
    originalContextMenu.style.left = `${x}px`;
    originalContextMenu.style.top = `${y}px`;
    originalContextMenu.classList.remove("hidden");
}
window.handleKategoriContextMenu = handleKategoriContextMenu;

// Fungsi untuk menyimpan kategori baru (mode tambah)
function saveNewKategori() {
    const newKategori = document
        .getElementById("newKategoriInput")
        .value.trim();
    if (newKategori === "") {
        alert("Nama kategori harus diisi.");
        return;
    }
    fetch("/kategori-pekerjaan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify({ kategori: [newKategori] }),
    })
        .then((response) => {
            if (!response.ok) throw new Error("Gagal menyimpan kategori.");
            return response.json();
        })
        .then((data) => {
            console.log("Response:", data);
            alert(data.message);
            closeInputKategoriModal();
            loadKategoriData(); // Perbarui daftar kategori
        })
        .catch((error) => {
            console.error("Error saving new kategori:", error);
            alert("Terjadi kesalahan saat menyimpan kategori.");
        });
}
window.saveNewKategori = saveNewKategori;

// Fungsi untuk mengedit kategori (dipanggil dari context menu)
function editKategori() {
    if (window.currentKategori) {
        // Simpan ID kategori yang akan diedit
        window.editKategoriId = window.currentKategori.id;
        // Isi input dengan nilai kategori yang ada
        document.getElementById("newKategoriInput").value =
            window.currentKategori.nama_kategori;
        // Ubah judul modal menjadi "Edit Kategori"
        document.getElementById("inputKategoriModalTitle").innerText =
            "Edit Kategori";
        // Sembunyikan tombol tambah dan tampilkan tombol simpan perubahan
        document.getElementById("btnTambahKategori").classList.add("hidden");
        document
            .getElementById("btnSimpanPerubahanKategori")
            .classList.remove("hidden");
        // Tampilkan modal input kategori
        document
            .getElementById("inputKategoriModal")
            .classList.remove("hidden");
    }
    // Sembunyikan context menu
    document.getElementById("kategori-context-menu").classList.add("hidden");
}
window.editKategori = editKategori;

// Fungsi untuk mengupdate kategori (mode edit)
function updateKategori() {
    const newKategori = document
        .getElementById("newKategoriInput")
        .value.trim();
    if (newKategori === "") {
        alert("Nama kategori harus diisi.");
        return;
    }
    if (!window.editKategoriId) {
        alert("ID kategori tidak ditemukan untuk update.");
        return;
    }
    fetch("/kategori-pekerjaan/" + window.editKategoriId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify({ nama_kategori: newKategori }),
    })
        .then((response) => {
            if (!response.ok) throw new Error("Gagal mengupdate kategori.");
            return response.json();
        })
        .then((data) => {
            console.log("Response:", data);
            alert(data.message);
            closeInputKategoriModal();
            loadKategoriData(); // Perbarui daftar kategori
        })
        .catch((error) => {
            console.error("Error updating kategori:", error);
            alert("Terjadi kesalahan saat mengupdate kategori.");
        });
}
window.updateKategori = updateKategori;

// Fungsi untuk menghapus kategori (ditrigger dari context menu)
function deleteKategoriContext() {
    if (window.currentKategori && window.currentKategori.id) {
        if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            fetch("/kategori-pekerjaan/" + window.currentKategori.id, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    alert(result.message);
                    loadKategoriData(); // Muat ulang data kategori
                })
                .catch((error) => {
                    console.error("Error deleting kategori:", error);
                });
        }
    }
    document.getElementById("kategori-context-menu").classList.add("hidden");
}
window.deleteKategoriContext = deleteKategoriContext;

// Sembunyikan context menu kategori ketika klik di luar
document.addEventListener("click", function (e) {
    const contextMenu = document.getElementById("kategori-context-menu");
    if (
        contextMenu &&
        !e.target.closest("#kategori-context-menu") &&
        !e.target.closest(".action-btn-kategori")
    ) {
        contextMenu.classList.add("hidden");
    }
});

// Variabel global untuk menyimpan ID kategori yang sedang dipilih
window.currentKategoriId = null;

// Fungsi untuk membuka modal input item pekerjaan dan menyimpan ID kategori saat ini
function tambahItemPekerjaan(kategoriId) {
    window.currentKategoriId = kategoriId;
    // Reset form input
    document.getElementById("itemForm").reset();
    // Pastikan field harga_satuan dikosongkan
    document.getElementById("harga_satuan").value = "";
    // Muat data AHSP ke dalam select
    loadAhspData();
    // Buka modal input item pekerjaan
    document.getElementById("inputItemModal").classList.remove("hidden");
}
window.tambahItemPekerjaan = tambahItemPekerjaan;

// Fungsi untuk menutup modal input item pekerjaan
function closeItemModal() {
    document.getElementById("inputItemModal").classList.add("hidden");
}
window.closeItemModal = closeItemModal;

// Fungsi untuk mengambil data AHSP dari server dan mengisi select
function loadAhspData() {
    console.log("Memuat data AHSP...");
    fetch("/ahsp/all")
        .then((response) => {
            console.log("Response status:", response.status);
            const contentType = response.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Response is not JSON");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data AHSP diterima:", data);
            const select = document.getElementById("ahspSelect");
            select.innerHTML = '<option value="">-- Pilih AHSP --</option>';
            data.forEach((ahsp) => {
                // Gunakan field: ahsp.judul sebagai Uraian, ahsp.grand_total sebagai Harga Satuan, dan ahsp.satuan sebagai Satuan
                select.innerHTML += `<option value="${ahsp.id}" data-uraian="${ahsp.judul}" data-harga="${ahsp.grand_total}" data-satuan="${ahsp.satuan}">${ahsp.judul}</option>`;
            });
        })
        .catch((error) => {
            console.error("Error loading AHSP data:", error);
            alert("Error loading AHSP data: " + error.message);
        });
}
window.loadAhspData = loadAhspData;

// Event listener untuk select AHSP agar mengisi field Uraian, Harga Satuan, dan Satuan
document.getElementById("ahspSelect").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value !== "") {
        // Isi field Uraian Pekerjaan dengan data dari AHSP
        document.getElementById("uraian_item").value =
            selectedOption.getAttribute("data-uraian") || "";
        // Isi Harga Satuan dengan nilai grand_total dari AHSP
        document.getElementById("harga_satuan").value =
            selectedOption.getAttribute("data-harga") || "";
        // Isi Satuan dengan nilai dari AHSP
        document.getElementById("satuan").value =
            selectedOption.getAttribute("data-satuan") || "";
    } else {
        document.getElementById("uraian_item").value = "";
        document.getElementById("harga_satuan").value = "";
        document.getElementById("satuan").value = "";
    }
});

// Fungsi untuk menyimpan item pekerjaan baru
function saveItemPekerjaan() {
    const form = document.getElementById("itemForm");
    const data = {
        kategori_pekerjaan_id: window.currentKategoriId,
        uraian_item: form.uraian_item.value.trim(),
        volume: 0,
        satuan: form.satuan.value.trim(),
        harga_satuan: parseFloat(form.harga_satuan.value) || 0,
        harga_total: 0,
    };

    // Validasi sederhana
    if (!data.uraian_item || !data.satuan || data.harga_satuan <= 0) {
        alert("Pastikan Uraian Pekerjaan, Satuan, dan Harga Satuan valid.");
        return;
    }

    fetch("/item-pekerjaan", {
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
                throw new Error("Gagal menyimpan item pekerjaan.");
            return response.json();
        })
        .then((result) => {
            alert(result.message);
            closeItemModal();
            updateItemList(window.currentKategoriId); // Perbarui daftar item pekerjaan untuk kategori terkait
        })
        .catch((error) => {
            console.error("Error saving item pekerjaan:", error);
            alert("Terjadi kesalahan saat menyimpan item pekerjaan.");
        });
    // Refresh halaman RAB
    location.reload();
}
window.saveItemPekerjaan = saveItemPekerjaan;

// Fungsi untuk menghapus item pekerjaan
function deleteItem(itemId) {
    if (confirm("Apakah Anda yakin ingin menghapus item pekerjaan ini?")) {
        fetch("/item-pekerjaan/" + itemId, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Gagal menghapus item pekerjaan.");
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                // Hapus baris yang memiliki data-item-id = itemId
                const row = document.querySelector(
                    'tr[data-item-id="' + itemId + '"]'
                );
                if (row) {
                    row.remove();
                }
                // Opsional: update nomor urut item (jika diperlukan)
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
                alert("Terjadi kesalahan saat menghapus item pekerjaan.");
            });
    }
}
window.deleteItem = deleteItem;

// Fungsi updateItemList() untuk memperbarui tampilan daftar item pekerjaan
function updateItemList(kategoriId) {
    console.log("Memperbarui daftar item untuk kategori ID: " + kategoriId);
    // Implementasi detail tergantung pada tampilan halaman utama.
    // Misalnya, Anda bisa fetch data item dan update tabel.
}
window.updateItemList = updateItemList;
