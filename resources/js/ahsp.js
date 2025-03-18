document.addEventListener("DOMContentLoaded", function () {
    // --- Variabel Global ---
    let currentRecord = null;
    window.currentAhsId = null;
    window.detailBahan = [];
    window.detailUpah = [];
    window.detailAlat = [];
    window.editDetailKategori = "";
    window.editDetailIndex = -1;
    window.currentDetail = null; // Untuk menyimpan data detail yang dipilih melalui context menu

    // --- Event Listener untuk Tombol Action (Context Menu) di halaman utama ---
    document.querySelectorAll(".action-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            currentRecord = {
                id: e.currentTarget.dataset.id,
                kode: e.currentTarget.dataset.kode, // pastikan view menyediakan data-kode
                judul: e.currentTarget.dataset.judul,
                satuan: e.currentTarget.dataset.satuan, // tambahkan data satuan
                x: e.pageX,
                y: e.pageY,
            };
            positionContextMenu(e);
            showContextMenu();
        });
    });

    // --- Fungsi untuk Menentukan dan Menampilkan Context Menu Utama ---
    function positionContextMenu(e) {
        const contextMenu = document.getElementById("context-menu");
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const menuWidth = 128; // Sesuaikan jika perlu
        const menuHeight = 80; // Sesuaikan jika perlu

        let x = e.pageX;
        if (x + menuWidth > viewportWidth) {
            x = viewportWidth - menuWidth;
        }
        let y = e.pageY;
        if (y + menuHeight > viewportHeight) {
            y = viewportHeight - menuHeight;
        }
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    }

    function showContextMenu() {
        const contextMenu = document.getElementById("context-menu");
        contextMenu.classList.remove("hidden");
    }

    document.addEventListener("click", (e) => {
        const contextMenu = document.getElementById("context-menu");
        if (
            contextMenu &&
            !contextMenu.contains(e.target) &&
            !e.target.closest(".action-btn")
        ) {
            contextMenu.classList.add("hidden");
        }
    });

    window.handleEdit = function () {
        if (currentRecord) {
            // Panggil modal full form dengan menyertakan parameter satuan
            openFullFormModal(
                true,
                currentRecord.judul,
                currentRecord.id,
                currentRecord.kode,
                currentRecord.satuan
            );
        }
        document.getElementById("context-menu").classList.add("hidden");
    };

    window.handleDelete = function () {
        if (
            currentRecord &&
            confirm(`Yakin menghapus "${currentRecord.judul}"?`)
        ) {
            const form = document.createElement("form");
            form.action = `/ahs/${currentRecord.id}`;
            form.method = "POST";
            form.innerHTML = `
        <input type="hidden" name="_token" value="${window.csrfToken}">
        <input type="hidden" name="_method" value="DELETE">
      `;
            document.body.appendChild(form);
            form.submit();
        }
        document.getElementById("context-menu").classList.add("hidden");
    };

    // --- Fungsi Dasar Modal ---
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("hidden");
    };

    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("hidden");
    };

    // --- Utility Fungsi ---
    function setInputValue(id, value) {
        const input = document.getElementById(id);
        if (input)
            input.value = value !== undefined && value !== null ? value : "";
    }

    function setMethodInput(form, method) {
        let methodInput = form.querySelector('input[name="_method"]');
        if (!methodInput) {
            methodInput = document.createElement("input");
            methodInput.type = "hidden";
            methodInput.name = "_method";
            methodInput.value = method;
            form.appendChild(methodInput);
        } else {
            methodInput.value = method;
        }
    }

    function removeMethodInput(form) {
        let methodInput = form.querySelector('input[name="_method"]');
        if (methodInput) methodInput.remove();
    }

    // --- Modal Full Form AHSP ---
    window.openFullFormModal = function (
        isEdit,
        judul = "",
        id = null,
        kode = "",
        satuan = "",
        sumber = ""
    ) {
        const modalId = "fullFormModal";
        const form = document.getElementById("ahspForm");
        const titleEl = document.getElementById("formTitle");
        if (!form || !titleEl) return;

        if (isEdit && id) {
            window.currentAhsId = id;
            titleEl.innerText = "Edit Data AHSP";
            form.action = window.ahsBaseUrl + "/" + id + "/detail";
            let methodInput = form.querySelector('input[name="_method"]');
            if (!methodInput) {
                setMethodInput(form, "PUT");
            } else {
                methodInput.value = "PUT";
            }
            // Set nilai input untuk judul, kode, dan satuan
            setInputValue("judulAHSP", judul);
            setInputValue("kodeAHSP", kode);
            setInputValue("satuanAHSP", satuan);
            setInputValue("sumberAHSP", sumber);
            document.getElementById("btnTambah").classList.add("hidden");
            document.getElementById("btnUpdate").classList.remove("hidden");

            // Ambil detail dari server dan perbarui tabel detail
            fetch(window.ahsBaseUrl + "/" + id + "/detail")
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then((text) => {
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    // Jika respons mengembalikan data overhead, perbarui field overheadInput
                    setInputValue(
                        "overheadInput",
                        data.overhead !== undefined ? data.overhead : ""
                    );
                    // Perbarui field kode dan satuan jika data tersedia
                    setInputValue("kodeAHSP", data.kode || kode);
                    setInputValue("satuanAHSP", data.satuan || satuan);
                    setInputValue("sumberAHSP", data.sumber || sumber);
                    window.detailBahan = data.bahan || [];
                    window.detailUpah = data.upah || [];
                    window.detailAlat = data.alat || [];
                    updateDetailTable("Bahan");
                    updateDetailTable("Upah");
                    updateDetailTable("Alat");
                })
                .catch((error) => {
                    console.error("Error fetching details:", error);
                    alert(
                        "Gagal memuat detail data. Periksa console untuk detail."
                    );
                });
        } else {
            window.currentAhsId = null;
            titleEl.innerText = "Input Data AHSP";
            form.action = window.ahsBaseUrl;
            let methodInput = form.querySelector('input[name="_method"]');
            if (methodInput) removeMethodInput(form);
            form.reset();
            clearAllDetailTables();
            setInputValue("kodeAHSP", "");
            setInputValue("satuanAHSP", "");
            setInputValue("sumberAHSP", "");
            document.getElementById("btnTambah").classList.remove("hidden");
            document.getElementById("btnUpdate").classList.add("hidden");
        }
        openModal(modalId);
    };

    window.closeFullFormModal = function () {
        closeModal("fullFormModal");
    };

    // --- Modal Detail Input ---
    window.openDetailModal = function (kategori) {
        window.editDetailKategori = kategori;
        window.editDetailIndex = -1;
        setInputValue("detailKategori", kategori);
        setInputValue("modalKoefisien", "");
        document.getElementById("modalItemSelect").selectedIndex = 0;
        document.getElementById("dynamicInputs").innerHTML = "";
        populateItemOptions(kategori);
        openModal("detailModal");
    };

    window.closeDetailModal = function () {
        closeModal("detailModal");
    };

    // --- Fungsi Clear Semua Detail ---
    window.clearAllDetailTables = function () {
        window.detailBahan = [];
        window.detailUpah = [];
        window.detailAlat = [];
        updateDetailTable("Bahan");
        updateDetailTable("Upah");
        updateDetailTable("Alat");
    };

    // --- Populate Opsi Select untuk Modal Detail ---
    function populateItemOptions(kategori) {
        const select = document.getElementById("modalItemSelect");
        select.innerHTML = '<option value="">-- Pilih Salah Satu --</option>';
        if (kategori === "Bahan") {
            window.bahanItems.forEach((item) => {
                const satuan = item.satuan || "";
                const harga = item.harga_bahan || 0;
                select.innerHTML += `<option value="${item.id}" data-uraian="${item.uraian_bahan}" data-satuan="${satuan}" data-harga="${harga}">${item.uraian_bahan} (${satuan})</option>`;
            });
        } else if (kategori === "Upah") {
            window.upahItems.forEach((item) => {
                const satuan = item.satuan || "";
                const harga = item.harga || 0;
                select.innerHTML += `<option value="${item.id}" data-uraian="${item.uraian_tenaga}" data-satuan="${satuan}" data-harga="${harga}">${item.uraian_tenaga} (${satuan})</option>`;
            });
        } else if (kategori === "Alat") {
            window.alatItems.forEach((item) => {
                const satuan = item.satuan || "";
                const harga = item.harga_alat || 0;
                select.innerHTML += `<option value="${item.id}" data-uraian="${item.uraian_alat}" data-satuan="${satuan}" data-harga="${harga}">${item.uraian_alat} (${satuan})</option>`;
            });
        }
    }

    // --- Event Listener untuk Select Modal Detail ---
    document
        .getElementById("modalItemSelect")
        .addEventListener("change", function () {
            const selectedOption = this.selectedOptions[0];
            const container = document.getElementById("dynamicInputs");
            if (selectedOption && selectedOption.value !== "") {
                const uraian = selectedOption.getAttribute("data-uraian") || "";
                const satuan = selectedOption.getAttribute("data-satuan") || "";
                const harga = selectedOption.getAttribute("data-harga") || "0";
                const html = `
          <div class="mb-2">
              <label class="block font-medium">Uraian</label>
              <input type="text" id="inputUraian" class="hover:bg-gray-100 border p-2 w-full" value="${uraian}">
          </div>
          <div class="mb-2">
              <label class="block font-medium">Satuan</label>
              <input type="text" id="inputSatuan" class="hover:bg-gray-100 border p-2 w-full" value="${satuan}">
          </div>
          <div class="mb-2">
              <label class="block font-medium">Harga Dasar</label>
              <input type="number" id="inputHargaDasar" class="hover:bg-gray-100 border p-2 w-full" value="${parseFloat(
                  harga
              )}">
          </div>
      `;
                container.innerHTML = html;
            } else {
                container.innerHTML = "";
            }
        });

    // --- Simpan Detail Modal ---
    window.saveDetail = function () {
        const kategori = document.getElementById("detailKategori").value;
        const select = document.getElementById("modalItemSelect");
        const itemId = select.value;
        const inputUraian = document.getElementById("inputUraian")
            ? document.getElementById("inputUraian").value
            : "";
        const inputSatuan = document.getElementById("inputSatuan")
            ? document.getElementById("inputSatuan").value
            : "";
        const inputHargaDasar = document.getElementById("inputHargaDasar")
            ? parseFloat(document.getElementById("inputHargaDasar").value) || 0
            : 0;
        const koefisien = parseFloat(
            document.getElementById("modalKoefisien").value
        );
        // Ambil nilai kode dari form summary modal
        const summaryKode = document.getElementById("kodeAHSP")
            ? document.getElementById("kodeAHSP").value
            : "";

        if (!itemId || isNaN(koefisien) || koefisien <= 0) {
            alert(
                "Pastikan Anda memilih item dan memasukkan koefisien yang valid."
            );
            return;
        }

        const detail = {
            kategori: kategori,
            item_id: itemId,
            kode: summaryKode,
            item_text: inputUraian,
            satuan: inputSatuan,
            harga_dasar: inputHargaDasar,
            koefisien: koefisien,
            harga_satuan: inputHargaDasar * koefisien,
        };

        if (window.editDetailIndex === -1) {
            if (kategori === "Bahan") {
                window.detailBahan.push(detail);
            } else if (kategori === "Upah") {
                window.detailUpah.push(detail);
            } else if (kategori === "Alat") {
                window.detailAlat.push(detail);
            }
        } else {
            if (kategori === "Bahan") {
                window.detailBahan[window.editDetailIndex] = detail;
            } else if (kategori === "Upah") {
                window.detailUpah[window.editDetailIndex] = detail;
            } else if (kategori === "Alat") {
                window.detailAlat[window.editDetailIndex] = detail;
            }
            window.editDetailIndex = -1;
        }
        updateDetailTable(kategori);
        closeDetailModal();
    };

    // --- Edit Detail Modal ---
    window.editDetail = function (kategori, index) {
        window.editDetailKategori = kategori;
        window.editDetailIndex = index;
        document.getElementById("detailModalTitle").innerText =
            "Edit Detail - " + kategori;
        setInputValue("detailKategori", kategori);
        let detail;
        if (kategori === "Bahan") {
            detail = window.detailBahan[index];
        } else if (kategori === "Upah") {
            detail = window.detailUpah[index];
        } else if (kategori === "Alat") {
            detail = window.detailAlat[index];
        }
        if (!detail) {
            console.error(
                "Detail tidak ditemukan untuk kategori:",
                kategori,
                "index:",
                index
            );
            return;
        }
        populateItemOptions(kategori);
        setTimeout(() => {
            document.getElementById("modalItemSelect").value = detail.item_id;
        }, 100);
        setInputValue("modalKoefisien", detail.koefisien);
        const container = document.getElementById("dynamicInputs");
        container.innerHTML = `
      <div class="mb-2">
          <label class="block font-medium">Uraian</label>
          <input type="text" id="inputUraian" class="hover:bg-gray-100 border p-2 w-full" value="${detail.item_text}">
      </div>
      <div class="mb-2">
          <label class="block font-medium">Satuan</label>
          <input type="text" id="inputSatuan" class="hover:bg-gray-100 border p-2 w-full" value="${detail.satuan}">
      </div>
      <div class="mb-2">
          <label class="block font-medium">Harga Dasar</label>
          <input type="number" id="inputHargaDasar" class="hover:bg-gray-100 border p-2 w-full" value="${detail.harga_dasar}">
      </div>
    `;
        openModal("detailModal");
    };

    // --- Hapus Detail ---
    window.deleteDetail = function (kategori, index) {
        if (kategori === "Bahan") {
            window.detailBahan.splice(index, 1);
        } else if (kategori === "Upah") {
            window.detailUpah.splice(index, 1);
        } else if (kategori === "Alat") {
            window.detailAlat.splice(index, 1);
        }
        updateDetailTable(kategori);
    };

    // --- Update Tabel Detail ---
    function updateDetailTable(kategori) {
        let tbody, totalCell, dataArray;
        if (kategori === "Bahan") {
            tbody = document.getElementById("tempBahan");
            totalCell = document.getElementById("totalBahanCell");
            dataArray = window.detailBahan;
        } else if (kategori === "Upah") {
            tbody = document.getElementById("tempUpah");
            totalCell = document.getElementById("totalUpahCell");
            dataArray = window.detailUpah;
        } else if (kategori === "Alat") {
            tbody = document.getElementById("tempAlat");
            totalCell = document.getElementById("totalAlatCell");
            dataArray = window.detailAlat;
        }
        tbody.innerHTML = "";
        let total = 0;
        dataArray.forEach((detail, index) => {
            total += detail.harga_satuan;
            tbody.innerHTML += `
        <tr class="hover:bg-gray-50 detail-row" data-index="${index}" data-kategori="${kategori}">
            <td class="p-2 border">${index + 1}</td>
            <td class="p-2 border">${detail.item_text}</td>
            <td class="p-2 border">${detail.koefisien}</td>
            <td class="p-2 border">${detail.satuan}</td>
            <td class="p-2 border">Rp ${numberFormat(detail.harga_dasar)}</td>
            <td class="p-2 border">Rp ${numberFormat(detail.harga_satuan)}</td>
            <td class="p-2 border text-center">
                <button type="button" class="action-btn px-4 text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100"
                    data-index="${index}" data-kategori="${kategori}"
                    data-item_text="${detail.item_text}" data-koefisien="${
                detail.koefisien
            }"
                    data-satuan="${detail.satuan}" data-harga_dasar="${
                detail.harga_dasar
            }"
                    data-harga_satuan="${detail.harga_satuan}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </td>
        </tr>
      `;
        });
        totalCell.innerText = "Rp " + numberFormat(total);
        updateGrandTotal();

        // Bind ulang event listener untuk tombol action-btn yang baru dibuat
        const actionButtons = tbody.querySelectorAll(".action-btn");
        actionButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                window.currentDetail = {
                    index: this.dataset.index,
                    kategori: this.dataset.kategori,
                    item_text: this.dataset.item_text,
                    koefisien: this.dataset.koefisien,
                    satuan: this.dataset.satuan,
                    harga_dasar: this.dataset.harga_dasar,
                    harga_satuan: this.dataset.harga_satuan,
                };
                handleDetailContextMenu(window.currentDetail, e);
            });
        });
    }

    function handleDetailContextMenu(detailData, event) {
        const contextMenu = document.getElementById("detail-context-menu");
        if (!contextMenu) {
            console.error("Elemen context menu detail tidak ditemukan.");
            return;
        }
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        let x = event.pageX;
        let y = event.pageY;
        if (x + menuWidth > viewportWidth) x = viewportWidth - menuWidth;
        if (y + menuHeight > viewportHeight) y = viewportHeight - menuHeight;
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.classList.remove("hidden");
    }

    // Sembunyikan context menu detail saat klik di luar
    document.addEventListener("click", function (e) {
        const contextMenu = document.getElementById("detail-context-menu");
        if (
            contextMenu &&
            !e.target.closest("#detail-context-menu") &&
            !e.target.closest(".action-btn")
        ) {
            contextMenu.classList.add("hidden");
        }
    });

    // Fungsi untuk menangani opsi Edit dari context menu detail
    window.handleDetailEdit = function () {
        if (window.currentDetail) {
            editDetail(
                window.currentDetail.kategori,
                parseInt(window.currentDetail.index)
            );
        }
        const contextMenu = document.getElementById("detail-context-menu");
        if (contextMenu) contextMenu.classList.add("hidden");
    };

    // Fungsi untuk menangani opsi Hapus dari context menu detail
    window.handleDetailDelete = function () {
        if (window.currentDetail) {
            deleteDetail(
                window.currentDetail.kategori,
                parseInt(window.currentDetail.index)
            );
        }
        const contextMenu = document.getElementById("detail-context-menu");
        if (contextMenu) contextMenu.classList.add("hidden");
    };

    // --- Update Grand Total ---
    function updateGrandTotal() {
        const totalBahan = window.detailBahan.reduce(
            (sum, detail) => sum + detail.harga_satuan,
            0
        );
        const totalUpah = window.detailUpah.reduce(
            (sum, detail) => sum + detail.harga_satuan,
            0
        );
        const totalAlat = window.detailAlat.reduce(
            (sum, detail) => sum + detail.harga_satuan,
            0
        );
        const subtotal = totalBahan + totalUpah + totalAlat;
        const overheadPercent =
            parseFloat(document.getElementById("overheadInput").value) || 0;
        const overhead = subtotal * (overheadPercent / 100);
        const grandTotal = subtotal + overhead;
        document.getElementById("subtotalCell").innerText =
            "Rp " + numberFormat(subtotal);
        document.getElementById("overheadCell").innerText =
            "Rp " + numberFormat(overhead);
        document.getElementById("grandTotalCell").innerText =
            "Rp " + numberFormat(grandTotal);
        document.getElementById("grandTotalLabel").innerText =
            "Rp " + numberFormat(grandTotal);
    }

    const overheadInput = document.getElementById("overheadInput");
    if (overheadInput) {
        overheadInput.addEventListener("input", function () {
            updateGrandTotal();
        });
    }

    // --- Fungsi Format Angka ---
    function numberFormat(value) {
        return parseFloat(value).toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // --- Event Listener untuk Tombol "Tambah" (Simpan Data Baru via AJAX) ---
    document.getElementById("btnTambah").addEventListener("click", function () {
        const allDetails = {
            bahan: window.detailBahan,
            upah: window.detailUpah,
            alat: window.detailAlat,
        };
        const judul = document.getElementById("judulAHSP").value.trim();
        const kode = document.getElementById("kodeAHSP").value.trim();
        const overhead = document.getElementById("overheadInput").value.trim();
        const satuan = document.getElementById("satuanAHSP").value.trim();
        const sumber = document.getElementById("sumberAHSP").value.trim();

        if (
            judul === "" ||
            kode === "" ||
            overhead === "" ||
            satuan === "" ||
            sumber === ""
        ) {
            alert("Judul, kode, overhead, satuan dan sumber harus diisi.");
            return;
        }
        const data = {
            judul: judul,
            satuan: satuan,
            kode: kode,
            overhead: overhead,
            sumber: sumber,
            detail: allDetails,
        };

        fetch(window.ahsDetailStoreRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": window.csrfToken,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then((result) => {
                if (result.success) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert("Terjadi kesalahan saat menyimpan data detail.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Terjadi kesalahan. Periksa console untuk detail.");
            });
    });

    // --- Event Listener untuk Tombol "Simpan Perubahan" (Update Data via AJAX) ---
    document.getElementById("btnUpdate").addEventListener("click", function () {
        const allDetails = {
            bahan: window.detailBahan,
            upah: window.detailUpah,
            alat: window.detailAlat,
        };
        const judul = document.getElementById("judulAHSP").value.trim();
        const kode = document.getElementById("kodeAHSP").value.trim();
        const overhead = document.getElementById("overheadInput").value.trim();
        const satuan = document.getElementById("satuanAHSP").value.trim();
        const sumber = document.getElementById("sumberAHSP").value.trim();

        if (
            judul === "" ||
            kode === "" ||
            overhead === "" ||
            satuan === "" ||
            sumber === ""
        ) {
            alert("Judul, kode, overhead, satuan dan sumber harus diisi.");
            return;
        }
        if (!window.currentAhsId) {
            alert("Record tidak ditemukan untuk update.");
            return;
        }
        const data = {
            judul: judul,
            satuan: satuan,
            kode: kode,
            overhead: overhead,
            sumber: sumber,
            detail: allDetails,
        };

        fetch(window.ahsBaseUrl + "/" + window.currentAhsId + "/detail", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": window.csrfToken,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then((result) => {
                if (result.success) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert("Terjadi kesalahan saat mengupdate data detail.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Terjadi kesalahan. Periksa console untuk detail.");
            });
    });
});
