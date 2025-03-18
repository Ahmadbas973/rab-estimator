// volumeLoadTemplates.js
function getColspanSub(satuan) {
    switch (satuan) {
        case "m3":
            return 9;
        case "m2":
            return 8;
        case "m":
            return 6;
        case "kg":
            return 7;
        case "ltr":
            return 6;
        case "bh":
        case "ls":
        case "unit":
            return 5;
        default:
            return 5;
    }
}
function getColspanSum(satuan) {
    switch (satuan) {
        case "m3":
            return 7;
        case "m2":
            return 6;
        case "m":
            return 4;
        case "kg":
            return 5;
        case "ltr":
            return 4;
        case "bh":
        case "ls":
        case "unit":
            return 3;
        default:
            return 3;
    }
}

export function generatePlusRows(plusData, unit) {
    let rows = "";
    let totalPlus = 0;
    rows += `
    <tr class="bg-blue-100 font-semibold">
      <td colspan="${getColspanSub(unit)}" class="px-4 py-2 border">
        A. Penambahan Volume
        <button onclick="addVolumeCalculation('plus')" class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded float-right">+</button>
      </td>
    </tr>
  `;
    if (plusData.length > 0) {
        plusData.forEach((calc, index) => {
            let rowHtml = "";
            if (unit === "m3") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang}</td>
            <td class="px-4 py-2 border">${calc.lebar}</td>
            <td class="px-4 py-2 border">${calc.tinggi}</td>
            <td class="px-4 py-2 border">${calc.volume}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "m2") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.lebar || ""}</td>
            <td class="px-4 py-2 border">${calc.luas || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "m") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "kg") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.berat_jenis || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "ltr") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.liter || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "bh" || unit === "ls" || unit === "unit") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            }
            rows += rowHtml;
            totalPlus += parseFloat(calc.hasil) || 0;
        });
        rows += `
      <tr class="bg-gray-100 font-semibold">
        <td colspan= "${getColspanSum(
            unit
        )}" class="px-4 py-2 border text-right">Total Penambahan:</td>
        <td class="px-4 py-2 border">${totalPlus.toFixed(2)}</td>
        <td class="px-4 py-2 border"></td>
      </tr>
    `;
    } else {
        rows += `
      <tr>
        <td colspan="${getColspanSub(
            unit
        )}" class="text-center">Tidak ada data penambahan volume</td>
      </tr>
    `;
    }
    return { rows, totalPlus };
}

export function generateMinusRows(minusData, unit) {
    let rows = "";
    let totalMinus = 0;
    rows += `
    <tr class="bg-red-100 font-semibold">
      <td colspan="${getColspanSub(unit)}" class="px-4 py-2 border">
        B. Pengurangan Volume
        <button onclick="addVolumeCalculation('minus')" class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded float-right">+</button>
      </td>
    </tr>
  `;
    if (minusData.length > 0) {
        minusData.forEach((calc, index) => {
            let rowHtml = "";
            if (unit === "m3") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang}</td>
            <td class="px-4 py-2 border">${calc.lebar}</td>
            <td class="px-4 py-2 border">${calc.tinggi}</td>
            <td class="px-4 py-2 border">${calc.volume}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "m2") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.lebar || ""}</td>
            <td class="px-4 py-2 border">${calc.luas || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "m") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "kg") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.panjang || ""}</td>
            <td class="px-4 py-2 border">${calc.berat_jenis || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "ltr") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.liter || ""}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            } else if (unit === "bh" || unit === "ls" || unit === "unit") {
                rowHtml = `
          <tr>
            <td class="px-4 py-2 border">${index + 1}</td>
            <td class="px-4 py-2 border">${calc.keterangan}</td>
            <td class="px-4 py-2 border">${calc.jumlah}</td>
            <td class="px-4 py-2 border">${calc.hasil}</td>
            <td class="px-4 py-2 border">
              <button onclick="editVolumeCalculation(${
                  calc.id
              })" class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deleteVolumeCalculation(${
                  calc.id
              })" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        `;
            }
            rows += rowHtml;
            totalMinus += parseFloat(calc.hasil) || 0;
        });
        rows += `
      <tr class="bg-gray-100 font-semibold">
        <td colspan="${getColspanSum(
            unit
        )}" class="px-4 py-2 border text-right">Total Pengurangan:</td>
        <td class="px-4 py-2 border">${totalMinus.toFixed(2)}</td>
        <td class="px-4 py-2 border"></td>
      </tr>
    `;
    } else {
        rows += `
      <tr>
        <td colspan=${getColspanSub(
            unit
        )}" class="text-center">Tidak ada data pengurangan volume</td>
      </tr>
    `;
    }
    return { rows, totalMinus };
}
