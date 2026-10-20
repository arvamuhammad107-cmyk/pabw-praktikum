# P9 — DOM, Event, dan Interaktivitas

## Informasi Proyek

- **Nama proyek:** Koleksi Kopi Favorit Saya
- **Pertemuan:** P9 — Memasang Data ke Halaman dan Menanggapi Pengguna
- **Teknologi:** HTML, CSS, JavaScript (DOM dan Event)

## Fitur yang Dikerjakan

1. Menampilkan daftar kopi dari array JavaScript.
2. Membuat elemen kartu menggunakan `createElement()`, `textContent`, dan `append()`.
3. Mengosongkan wadah daftar sebelum daftar digambar ulang.
4. Memfilter daftar kopi berdasarkan jenis kopi.
5. Memvalidasi form dan menampilkan pesan kesalahan pada kolom yang belum valid.
6. Menambahkan kopi baru tanpa memuat ulang halaman.

## Hasil Pengujian

- [v] Daftar kopi tampil pada halaman.
- [v] Tombol filter berfungsi.
- [v] Form dapat menambahkan kopi baru.
- [v] Validasi form berfungsi.
- [v] Console diperiksa dan tidak ada galat.
- [v] Screenshot bukti pengujian disimpan.

## Tiket Keluar

### 1. Sebutkan satu elemen, pemilih, dan variabelnya.

Elemen daftar kopi diambil menggunakan `document.querySelector("#daftar-kopi-container")` dan disimpan dalam variabel `daftarKopiContainer`.

### 2. Apa perbedaan querySelector dan querySelectorAll?

`querySelector()` mengambil elemen pertama yang cocok, sedangkan `querySelectorAll()` mengambil semua elemen yang cocok dalam bentuk NodeList. NodeList tidak memiliki metode `map()` secara langsung.

### 3. Apa keuntungan event delegation?

Event delegation memungkinkan satu pendengar pada elemen induk menangani klik dari beberapa tombol. Kode menggunakan `event.target.closest()` untuk menemukan tombol filter yang diklik.

### 4. Apa yang terjadi jika wadah tidak dikosongkan sebelum render?

Elemen lama tetap berada di halaman sehingga kartu dapat muncul berulang kali setiap daftar digambar ulang.

### 5. Mengapa tidak menggunakan innerHTML untuk data pengguna?

Data pengguna sebaiknya ditampilkan menggunakan `textContent` agar diperlakukan sebagai teks, bukan sebagai kode HTML.

## Deklarasi Penggunaan AI

Saya menggunakan ChatGPT sebagai bantuan belajar untuk memahami DOM, event delegation, validasi form, debugging, dan penyusunan dokumentasi. Saya menguji fitur pada halaman dan bertanggung jawab untuk memeriksa serta memahami kode yang digunakan.

## Bukti Pengujian

Screenshot akan ditambahkan setelah seluruh pengujian dan pemeriksaan selesai.
