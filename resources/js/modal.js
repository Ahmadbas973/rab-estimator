document.addEventListener("DOMContentLoaded", function () {
    // === Fungsi Dasar Modal ===
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove("hidden");
        }
    };

    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add("hidden");
        }
    };

    // === Utility Functions ===
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

    function setInputValue(id, value) {
        const input = document.getElementById(id);
        if (input) {
            input.value = value || "";
        }
    }

    // === Modal Bahan (Tambah/Edit) ===
    window.openBahanModal = function (
        isEdit,
        id = "",
        uraian = "",
        satuan = "",
        harga = "",
        sumber = ""
    ) {
        const modalId = "bahanModal";
        const form = document.getElementById("bahanForm");
        const titleEl = document.getElementById("bahanModalTitle");
        if (!form || !titleEl) {
            console.error("Elemen modal Bahan tidak ditemukan.");
            return;
        }
        if (isEdit && id) {
            titleEl.innerText = "Edit Bahan";
            form.action = `/bahan/${id}`;
            setMethodInput(form, "PUT");
        } else {
            titleEl.innerText = "Tambah Bahan";
            form.action = form.getAttribute("data-original-action") || "/bahan";
            removeMethodInput(form);
            form.reset();
        }
        setInputValue("uraian_bahan", uraian);
        setInputValue("satuan_bahan", satuan);
        setInputValue("harga_bahan", harga);
        setInputValue("sumber_bahan", sumber);
        openModal(modalId);
    };

    window.closeBahanModal = function () {
        closeModal("bahanModal");
    };

    // === Modal Upah (Tambah/Edit) ===
    window.openUpahModal = function (
        isEdit,
        id = "",
        uraian = "",
        satuan = "",
        harga = "",
        sumber = ""
    ) {
        const modalId = "upahModal";
        const form = document.getElementById("upahForm");
        const titleEl = document.getElementById("upahModalTitle");
        if (!form || !titleEl) {
            console.error("Elemen modal Upah tidak ditemukan.");
            return;
        }
        if (isEdit && id) {
            titleEl.innerText = "Edit Upah";
            form.action = `/upah/${id}`;
            setMethodInput(form, "PUT");
        } else {
            titleEl.innerText = "Tambah Upah";
            form.action = form.getAttribute("data-original-action") || "/upah";
            removeMethodInput(form);
            form.reset();
        }
        setInputValue("uraian_tenaga", uraian);
        setInputValue("satuan_upah", satuan);
        setInputValue("harga_upah", harga);
        setInputValue("sumber_upah", sumber);
        openModal(modalId);
    };

    window.closeUpahModal = function () {
        closeModal("upahModal");
    };

    // === Modal Alat (Tambah/Edit) ===
    window.openAlatModal = function (
        isEdit,
        id = "",
        uraian = "",
        satuan = "",
        harga = "",
        sumber = ""
    ) {
        const modalId = "alatModal";
        const form = document.getElementById("alatForm");
        const titleEl = document.getElementById("alatModalTitle");
        if (!form || !titleEl) {
            console.error("Elemen modal Alat tidak ditemukan.");
            return;
        }
        if (isEdit && id) {
            titleEl.innerText = "Edit Alat";
            form.action = `/alat/${id}`;
            setMethodInput(form, "PUT");
        } else {
            titleEl.innerText = "Tambah Alat";
            form.action = form.getAttribute("data-original-action") || "/alat";
            removeMethodInput(form);
            form.reset();
        }
        setInputValue("uraian_alat", uraian);
        setInputValue("satuan_alat", satuan);
        setInputValue("harga_alat", harga);
        setInputValue("sumber_alat", sumber);
        openModal(modalId);
    };

    window.closeAlatModal = function () {
        closeModal("alatModal");
    };

    // === Context Menu untuk Edit & Hapus ===
    let currentRecord = null;
    const contextMenu = document.getElementById("context-menu");

    if (contextMenu) {
        document.querySelectorAll(".action-btn").forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                currentRecord = {
                    id: this.dataset.id,
                    uraian: this.dataset.uraian,
                    satuan: this.dataset.satuan,
                    harga: this.dataset.harga,
                    sumber: this.dataset.sumber,
                    module: this.dataset.module, // misalnya "bahan", "upah", atau "alat"
                    x: e.pageX,
                    y: e.pageY,
                };
                positionContextMenu(e);
                showContextMenu();
            });
        });
    }

    function positionContextMenu(e) {
        if (!contextMenu) return;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const menuWidth = 128;
        const menuHeight = 80;
        let x = e.pageX;
        let y = e.pageY;
        if (x + menuWidth > viewportWidth) x = viewportWidth - menuWidth;
        if (y + menuHeight > viewportHeight) y = viewportHeight - menuHeight;
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
    }

    function showContextMenu() {
        if (contextMenu) contextMenu.classList.remove("hidden");
    }

    document.addEventListener("click", function (e) {
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
            if (currentRecord.module === "bahan") {
                openBahanModal(
                    true,
                    currentRecord.id,
                    currentRecord.uraian,
                    currentRecord.satuan,
                    currentRecord.harga,
                    currentRecord.sumber
                );
            } else if (currentRecord.module === "upah") {
                openUpahModal(
                    true,
                    currentRecord.id,
                    currentRecord.uraian,
                    currentRecord.satuan,
                    currentRecord.harga,
                    currentRecord.sumber
                );
            } else if (currentRecord.module === "alat") {
                openAlatModal(
                    true,
                    currentRecord.id,
                    currentRecord.uraian,
                    currentRecord.satuan,
                    currentRecord.harga,
                    currentRecord.sumber
                );
            }
        }
        if (contextMenu) contextMenu.classList.add("hidden");
    };

    window.handleDelete = function () {
        if (
            currentRecord &&
            confirm(`Yakin menghapus "${currentRecord.uraian}"?`)
        ) {
            let deleteUrl = "";
            if (currentRecord.module === "bahan") {
                deleteUrl = `/bahan/${currentRecord.id}`;
            } else if (currentRecord.module === "upah") {
                deleteUrl = `/upah/${currentRecord.id}`;
            } else if (currentRecord.module === "alat") {
                deleteUrl = `/alat/${currentRecord.id}`;
            }
            const form = document.createElement("form");
            form.action = deleteUrl;
            form.method = "POST";
            form.innerHTML = `
        <input type="hidden" name="_token" value="${window.csrfToken}">
        <input type="hidden" name="_method" value="DELETE">
      `;
            document.body.appendChild(form);
            form.submit();
        }
        if (contextMenu) contextMenu.classList.add("hidden");
    };
});
