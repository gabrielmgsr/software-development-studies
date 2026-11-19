const firebaseConfig = {
    apiKey: "AIzaSyBNUAn70ge_y1dIuT6MUorR26llwRZrbc0",
    authDomain: "site-7386d.firebaseapp.com",
    projectId: "site-7386d",
    storageBucket: "site-7386d.firebasestorage.app",
    messagingSenderId: "496420926203",
    appId: "1:496420926203:web:afda39fdfd27853e68765e",
    measurementId: "G-PTKVP8LZ4T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// 24 de Agosto de 2026 (mês começa em 0: 7 = Agosto)
const startDate = new Date(2026, 7, 24, 0, 0, 0);

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    if (diff < 0) return;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCounter, 1000);
updateCounter();

// --- UPLOAD PARA O FIREBASE ---
const form = document.getElementById('photo-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('photo-file');
    const dateInput = document.getElementById('photo-date').value;
    const descInput = document.getElementById('photo-desc').value.trim();
    const file = fileInput.files[0];

    if (!file) return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';

    const storageRef = storage.ref('fotos/' + Date.now() + '_' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
        'state_changed',
        null,
        (error) => {
            console.error('Erro no Storage:', error);
            alert('Erro ao enviar imagem: ' + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar para o Site';
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                return db.collection('momentos').add({
                    image: downloadURL,
                    date: dateInput,
                    desc: descInput,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            }).then(() => {
                alert('Foto adicionada com sucesso!');
                form.reset();
            }).catch((error) => {
                console.error('Erro no Firestore:', error);
                alert('Erro ao salvar informações: ' + error.message);
            }).finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Enviar para o Site';
            });
        }
    );
});

// --- CARREGAR FOTOS DO BANCO DE DADOS EM TEMPO REAL ---
const galleryGrid = document.getElementById('gallery-grid');

db.collection('momentos')
    .orderBy('timestamp', 'desc')
    .onSnapshot(
        (snapshot) => {
            galleryGrid.innerHTML = '';

            if (snapshot.empty) {
                galleryGrid.innerHTML = '<p style="grid-column: 1/-1; color: #82828c;">Nenhum momento publicado ainda.</p>';
                return;
            }

            snapshot.forEach((doc) => {
                const photo = doc.data();

                let formattedDate = photo.date || '';
                if (photo.date) {
                    const parts = photo.date.split('-');
                    if (parts.length === 3) {
                        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                    }
                }

                const card = document.createElement('div');
                card.className = 'photo-card';
                card.innerHTML = `
                    <div>
                        <img src="${photo.image}" alt="Momento">
                        <div class="photo-info">
                            <div class="photo-date">📅 ${formattedDate}</div>
                            <div class="photo-caption">${photo.desc || ''}</div>
                        </div>
                    </div>
                    <a href="${photo.image}" target="_blank" rel="noopener noreferrer" download class="btn-download">Baixar Foto 📥</a>
                `;
                galleryGrid.appendChild(card);
            });
        },
        (error) => {
            console.error('Erro ao ler momentos:', error);
            galleryGrid.innerHTML = '<p style="grid-column: 1/-1; color: #ff6b81;">Não foi possível carregar as fotos. Verifique as regras do Firestore e Storage no Firebase.</p>';
        }
    );