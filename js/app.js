
import { ambilData } from "./api.js";

import {
    daftarKopiContainer,
    filterKopi,
    pesanKosong,
    formKopi,
    inputNama,
    inputJenis,
    inputAsal,
    inputRating,
    tombolSimpan,
    errorNama,
    errorJenis,
    errorAsal,
    errorRating
} from "./dom.js";

let daftarKopi = [];
let filterAktif = "semua";
let dataBerhasilDimuat = false;

function tampilkanPesan(pesan) {
    daftarKopiContainer.replaceChildren();

    const teks = document.createElement("p");
    teks.textContent = pesan;

    daftarKopiContainer.append(teks);
    pesanKosong.hidden = true;
}

function tampilkanKopi() {
    daftarKopiContainer.replaceChildren();

    const kopiTerpilih = daftarKopi.filter(function (kopi) {
        return filterAktif === "semua" ||
            kopi.jenis === filterAktif;
    });

    kopiTerpilih.forEach(function (kopi) {
        const kartu = document.createElement("article");
        kartu.classList.add("card");

        const judul = document.createElement("h3");
        judul.textContent = kopi.nama;

        const jenis = document.createElement("p");
        jenis.textContent = "Jenis: " + kopi.jenis;

        const asal = document.createElement("p");
        asal.textContent = "Asal: " + kopi.asal;

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + kopi.rating;

        kartu.append(judul, jenis, asal, rating);
        daftarKopiContainer.append(kartu);
    });

    pesanKosong.hidden = kopiTerpilih.length > 0;

    if (kopiTerpilih.length === 0) {
        pesanKosong.textContent =
            daftarKopi.length === 0
                ? "Belum ada data kopi."
                : "Kopi tidak ditemukan untuk filter ini.";
    }
}

// Mengubah data API ke format yang digunakan halaman.
function petakanDataAPI(dataAPI) {
    return dataAPI.map(function (item, indeks) {
        return {
            nama: item.title || item.name || "Kopi " + (indeks + 1),
            jenis: "Tidak diketahui",
            asal: "Tidak tersedia dari API",
            rating: "Tidak tersedia dari API",
            deskripsi: item.description || "",
            bahan: Array.isArray(item.ingredients)
                ? item.ingredients.join(", ")
                : ""
        };
    });
}

// Memuat data dari API.
async function muatDataKopi() {
    tampilkanPesan("Sedang memuat data kopi...");

    try {
        const dataAPI = await ambilData();

        if (!Array.isArray(dataAPI)) {
            throw new Error("Data API bukan berbentuk larik.");
        }

        daftarKopi = petakanDataAPI(dataAPI);
        dataBerhasilDimuat = true;

        if (daftarKopi.length === 0) {
            tampilkanPesan(
                "API berhasil diakses, tetapi belum ada data kopi."
            );
            return;
        }

        tampilkanKopi();
        console.log("Data kopi berhasil dimuat:", daftarKopi);
    } catch (galat) {
        dataBerhasilDimuat = false;
        tampilkanPesan(
            "Gagal memuat data kopi: " + galat.message
        );
        console.error("Kesalahan:", galat.message);
    }
}

// Filter kopi.
filterKopi.addEventListener("click", function (event) {
    const tombol = event.target.closest("button[data-filter]");

    if (!tombol || !filterKopi.contains(tombol)) {
        return;
    }

    filterAktif = tombol.dataset.filter;

    filterKopi.querySelectorAll("button[data-filter]")
        .forEach(function (item) {
            item.setAttribute(
                "aria-pressed",
                String(item === tombol)
            );
        });

    if (dataBerhasilDimuat) {
        tampilkanKopi();
    }
});

// Validasi form.
function validasiForm() {
    const nama = inputNama.value.trim();
    const jenis = inputJenis.value;
    const asal = inputAsal.value.trim();
    const rating = inputRating.value.trim();

    errorNama.textContent = nama === ""
        ? "Nama kopi wajib diisi."
        : "";

    errorJenis.textContent = jenis === ""
        ? "Pilih jenis kopi."
        : "";

    errorAsal.textContent = asal === ""
        ? "Asal kopi wajib diisi."
        : "";

    const angkaRating = Number(rating);

    const ratingValid =
        rating !== "" &&
        Number.isInteger(angkaRating) &&
        angkaRating >= 1 &&
        angkaRating <= 5;

    errorRating.textContent = ratingValid
        ? ""
        : "Rating harus berupa bilangan bulat 1–5.";

    const formValid =
        nama !== "" &&
        jenis !== "" &&
        asal !== "" &&
        ratingValid;

    tombolSimpan.disabled = !formValid;

    return formValid;
}

formKopi.addEventListener("input", validasiForm);
formKopi.addEventListener("change", validasiForm);

// Menambahkan kopi dari form.
formKopi.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validasiForm()) {
        return;
    }

    daftarKopi.push({
        nama: inputNama.value.trim(),
        jenis: inputJenis.value,
        asal: inputAsal.value.trim(),
        rating: Number(inputRating.value),
        deskripsi: "",
        bahan: ""
    });

    dataBerhasilDimuat = true;
    filterAktif = "semua";

    filterKopi.querySelectorAll("button[data-filter]")
        .forEach(function (tombol) {
            tombol.setAttribute(
                "aria-pressed",
                String(tombol.dataset.filter === "semua")
            );
        });

    tampilkanKopi();

    formKopi.reset();
    validasiForm();
});

// Jalankan validasi awal dan pemuatan data.
validasiForm();
muatDataKopi();
