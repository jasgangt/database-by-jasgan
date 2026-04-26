// Database.js

// 1. Ambil fungsi createClient dari library
const { createClient } = supabase; 

// 2. PERBAIKAN URL: Hapus '/rest/v1/' di ujungnya. Supabase library akan menambahkannya otomatis.
// 3. PERBAIKAN STRING: Pastikan tidak ada tanda kutip (') atau titik koma (;) DI DALAM string.
const SUPABASE_URL = 'https://wkcjdbvnmccyvhgpfvxo.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_AWXj-nUL7zPK9FtYyDOvtg_fAQuyHdp'; // Pastikan ini 'anon public' key

// 4. Inisialisasi client dengan variabel yang sudah bersih
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function addTask() {
    console.log("Fungsi addTask dipanggil..."); 
// Fungsi untuk mengambil data dari Supabase
async function muatData() {
    const { data, error } = await _supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false }); // Data terbaru di atas

    if (error) {
        console.error("Gagal memuat data:", error.message);
    } else {
        const list = document.getElementById('taskList');
        list.innerHTML = ''; // Kosongkan list sebelum diisi data baru

        data.forEach(item => {
            const li = document.createElement('li');
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #ddd";
            li.innerHTML = `<strong>${item.title}</strong> <br> <small>${new Date(item.created_at).toLocaleString('id-ID')}</small>`;
            list.appendChild(li);
        });
    }
}

// Panggil fungsi ini setiap kali halaman web dibuka
muatData();

    // Fungsi untuk mengambil dan menampilkan data
async function tampilkanData() {
    const { data, error } = await _supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

    if (!error) {
        const list = document.getElementById('taskList');
        list.innerHTML = ''; // Bersihkan list lama
        data.forEach(tugas => {
            const li = document.createElement('li');
            li.innerHTML = `<b>${tugas.title}</b> - <small>${new Date(tugas.created_at).toLocaleString()}</small>`;
            list.appendChild(li);
        });
    }
}

// Jalankan fungsi ini setiap kali halaman dibuka
tampilkanData();

    const input = document.getElementById('taskInput');
    const title = input.value;

    if (!title) {
        alert("Silakan isi tugas!");
        return;
    }

    try {
        // Mengirim data ke tabel 'tasks'
        const { data, error } = await _supabase
            .from('tasks')
            .insert([{ title: title }]);

        if (error) throw error;

        console.log("Berhasil simpan ke database!");
        input.value = ""; 
        alert("MANTAP! Berhasil menambahkan data!");
        
        // Refresh untuk melihat hasil
        location.reload(); 
    } catch (err) {
        console.error("Error saat simpan:", err.message);
        alert("Gagal: " + err.message);
    }
}
