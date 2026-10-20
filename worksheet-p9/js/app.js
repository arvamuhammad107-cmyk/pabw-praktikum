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

// Data awal kopi
const daftarKopi = [
    {
        nama: "Kopi Arabika Gayo",
        jenis: "Arabika",
        asal: "Gayo",
        rating: 5
    },
    {
        nama: "Kopi Robusta Temanggung",
        jenis: "Robusta",
        asal: "Temanggung",
        rating: 4
    },
    {
        nama: "Kopi Toraja",
        jenis: "Arabika",
        asal: "Toraja",
        rating: 5
    }
];

let filterAktif = "semua";

// Menampilkan daftar kopi
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
        rating.textContent = "Rating: " + kopi.rating + "/5";

        kartu.append(judul, jenis, asal, rating);
        daftarKopiContainer.append(kartu);
    });

    pesanKosong.hidden = kopiTerpilih.length > 0;
}

// Mengatur tombol filter menggunakan event delegation
filterKopi.addEventListener("click", function (event) {
    const tombol = event.target.closest("button[data-filter]");

    if (!tombol || !filterKopi.contains(tombol)) {
        return;
    }

    filterAktif = tombol.dataset.filter;

    const semuaTombol =
        filterKopi.querySelectorAll("button[data-filter]");

    semuaTombol.forEach(function (item) {
        item.setAttribute(
            "aria-pressed",
            String(item === tombol)
        );
    });

    tampilkanKopi();
});

// Validasi form
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

// Validasi ketika pengguna mengisi form
formKopi.addEventListener("input", validasiForm);
formKopi.addEventListener("change", validasiForm);

// Menangani pengiriman form
formKopi.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validasiForm()) {
        return;
    }

    const kopiBaru = {
        nama: inputNama.value.trim(),
        jenis: inputJenis.value,
        asal: inputAsal.value.trim(),
        rating: Number(inputRating.value)
    };

    daftarKopi.push(kopiBaru);

    // Kembali ke filter Semua
    filterAktif = "semua";

    filterKopi.querySelectorAll("button[data-filter]")
        .forEach(function (tombol) {
            const aktif = tombol.dataset.filter === "semua";

            tombol.setAttribute(
                "aria-pressed",
                String(aktif)
            );
        });

    tampilkanKopi();

    formKopi.reset();
    validasiForm();

    alert("Kopi berhasil ditambahkan!");
});

// Menjalankan fungsi saat halaman dibuka
tampilkanKopi();
validasiForm();
