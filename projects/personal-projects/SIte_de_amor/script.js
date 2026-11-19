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
const auth = firebase.auth();
const db = firebase.firestore();

// E-mail compartilhado cadastrado no Firebase Authentication
const SHARED_EMAIL = "amandamarcoscasal@gamil.com";

const btnTopUpload = document.getElementById('btn-top-upload');
const btnLockUpload = document.getElementById('btn-lock-upload');
const adminSection = document.getElementById('admin-section');
const passwordModal = document.getElementById('password-modal');
const passwordForm = document.getElementById('password-form');
const uploadPasswordInput = document.getElementById('upload-password');
const passwordError = document.getElementById('password-error');
const passwordClose = document.getElementById('password-close');
const passwordBackdrop = document.getElementById('password-backdrop');

const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const modalDate = document.getElementById('modal-date');
const modalDesc = document.getElementById('modal-desc');
const modalDownload = document.getElementById('modal-download');
const modalDelete = document.getElementById('modal-delete');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

const confirmDeleteModal = document.getElementById('confirm-delete-modal');
const confirmDeleteText = document.getElementById('confirm-delete-text');
const confirmDeleteClose = document.getElementById('confirm-delete-close');
const confirmDeleteBackdrop = document.getElementById('confirm-delete-backdrop');
const confirmDeleteCancel = document.getElementById('confirm-delete-cancel');
const confirmDeleteYes = document.getElementById('confirm-delete-yes');

const feedbackToast = document.getElementById('feedback-toast');
const feedbackHearts = document.getElementById('feedback-hearts');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');

let isAuthenticated = false;
let latestSnapshotDocs = [];
let currentDocId = null;
let pendingDelete = null;
let feedbackTimer = null;

// --- ANIMAÇÃO DE FEEDBACK (ADICIONAR / APAGAR) ---
function spawnHearts(emojis) {
    if (!feedbackHearts) return;
    feedbackHearts.innerHTML = '';
    const positions = ['12%', '28%', '46%', '65%', '82%'];
    positions.forEach((left, idx) => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = emojis[idx % emojis.length];
        heart.style.left = left;
        heart.style.animationDelay = `${idx * 0.09}s`;
        feedbackHearts.appendChild(heart);
    });
}

function showFeedback(type, title, message) {
    if (!feedbackToast) return;
    clearTimeout(feedbackTimer);
    feedbackToast.classList.remove('show', 'is-add', 'is-delete');

    if (type === 'delete') {
        feedbackToast.classList.add('is-delete');
        if (feedbackIcon) feedbackIcon.textContent = '💔';
        spawnHearts(['🗑️', '✨', '💨', '🖤']);
    } else {
        feedbackToast.classList.add('is-add');
        if (feedbackIcon) feedbackIcon.textContent = '❤️';
        spawnHearts(['❤️', '💖', '💕', '✨', '💘']);
    }

    if (feedbackTitle) feedbackTitle.textContent = title;
    if (feedbackMessage) feedbackMessage.textContent = message;

    void feedbackToast.offsetWidth;
    feedbackToast.classList.add('show');

    feedbackTimer = setTimeout(() => {
        feedbackToast.classList.remove('show');
    }, 2800);
}

// --- MODAL DE SENHA ---
function openPasswordModal() {
    passwordError.textContent = '';
    passwordForm.reset();
    passwordModal.classList.add('open');
    passwordModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => uploadPasswordInput.focus(), 50);
}

function closePasswordModal() {
    passwordModal.classList.remove('open');
    passwordModal.setAttribute('aria-hidden', 'true');
    passwordError.textContent = '';
}

// Ao abrir/atualizar a página, encerra sessão anterior para sempre exigir senha ao clicar em Upload
auth.signOut().catch(() => {});

btnTopUpload.addEventListener('click', () => {
    openPasswordModal();
});

if (btnLockUpload) {
    btnLockUpload.addEventListener('click', async () => {
        adminSection.style.display = 'none';
        try {
            await auth.signOut();
        } catch (err) {
            console.error('Erro ao sair:', err);
        }
    });
}

passwordClose.addEventListener('click', closePasswordModal);
passwordBackdrop.addEventListener('click', closePasswordModal);

passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const senha = uploadPasswordInput.value;
    const submitPassBtn = passwordForm.querySelector('button[type="submit"]');

    passwordError.textContent = '';
    submitPassBtn.disabled = true;
    submitPassBtn.innerText = 'Entrando...';

    try {
        await auth.signInWithEmailAndPassword(SHARED_EMAIL, senha);
        closePasswordModal();
        adminSection.style.display = 'block';
        adminSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Falha no login:', error);
        passwordError.textContent = 'Senha incorreta ou não foi possível autenticar.';
        uploadPasswordInput.select();
    } finally {
        submitPassBtn.disabled = false;
        submitPassBtn.innerText = 'Liberar Upload';
    }
});

auth.onAuthStateChanged((user) => {
    isAuthenticated = Boolean(user);
    if (!isAuthenticated) {
        adminSection.style.display = 'none';
    }
    if (modalDelete) {
        modalDelete.style.display = isAuthenticated ? '' : 'none';
    }
    renderGallery();
});

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

// --- COMPRESSÃO DA IMAGEM NO NAVEGADOR ---
function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Falha ao ler a imagem.'));
        reader.onload = (event) => {
            const img = new Image();
            img.onerror = () => reject(new Error('Arquivo de imagem inválido.'));
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const base64 = canvas.toDataURL('image/jpeg', quality);
                resolve(base64);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// --- EXTRAIR DATA DA FOTO (QUALQUER EXTENSÃO + EXIF JPEG/TIFF + FALLBACK LASTMODIFIED) ---
function formatDateToInput(dateObj) {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) {
        return '';
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseExifDateString(exifStr) {
    if (typeof exifStr !== 'string') return '';
    const match = exifStr.trim().match(/^(\d{4})[:\-](\d{2})[:\-](\d{2})/);
    if (!match) return '';
    return `${match[1]}-${match[2]}-${match[3]}`;
}

function parseTiffDateFromBuffer(buffer, tiffStart) {
    const view = new DataView(buffer);
    if (tiffStart + 8 > view.byteLength) return '';

    const endian = view.getUint16(tiffStart, false);
    const littleEndian = endian === 0x4949;
    if (!littleEndian && endian !== 0x4D4D) return '';

    const ifd0Offset = view.getUint32(tiffStart + 4, littleEndian);
    let exifSubIfdOffset = null;
    let ifd0Date = '';

    const readAscii = (strOffset, maxLen) => {
        let out = '';
        for (let i = 0; i < maxLen && strOffset + i < view.byteLength; i++) {
            const code = view.getUint8(strOffset + i);
            if (code === 0) break;
            out += String.fromCharCode(code);
        }
        return out;
    };

    const parseIfd = (ifdRelOffset) => {
        const dirStart = tiffStart + ifdRelOffset;
        if (dirStart + 2 > view.byteLength) return '';
        const entries = view.getUint16(dirStart, littleEndian);

        for (let i = 0; i < entries; i++) {
            const entryOffset = dirStart + 2 + i * 12;
            if (entryOffset + 12 > view.byteLength) break;

            const tag = view.getUint16(entryOffset, littleEndian);
            const type = view.getUint16(entryOffset + 2, littleEndian);
            const count = view.getUint32(entryOffset + 4, littleEndian);
            const valueOrOffset = view.getUint32(entryOffset + 8, littleEndian);

            if (tag === 0x8769) {
                exifSubIfdOffset = valueOrOffset;
            }

            if ((tag === 0x9003 || tag === 0x9004 || tag === 0x0132) && type === 2) {
                const strPos = count > 4 ? tiffStart + valueOrOffset : entryOffset + 8;
                const rawDate = readAscii(strPos, count);
                const parsed = parseExifDateString(rawDate);
                if (parsed) {
                    if (tag === 0x9003) return parsed;
                    if (!ifd0Date) ifd0Date = parsed;
                }
            }
        }
        return '';
    };

    const originalDate = parseIfd(ifd0Offset);
    if (originalDate) return originalDate;

    if (exifSubIfdOffset) {
        const subDate = parseIfd(exifSubIfdOffset);
        if (subDate) return subDate;
    }

    return ifd0Date;
}

function extractExifDateFromArrayBuffer(buffer) {
    const view = new DataView(buffer);
    if (view.byteLength < 8) return '';

    const magic2 = view.getUint16(0, false);

    // 1) JPEG (0xFFD8) com segmento APP1 (0xFFE1)
    if (magic2 === 0xFFD8) {
        let offset = 2;
        while (offset + 4 < view.byteLength) {
            const marker = view.getUint16(offset, false);
            offset += 2;

            if (marker === 0xFFE1) {
                const segmentStart = offset + 2;
                if (
                    segmentStart + 6 < view.byteLength &&
                    view.getUint32(segmentStart, false) === 0x45786966 &&
                    view.getUint16(segmentStart + 4, false) === 0x0000
                ) {
                    return parseTiffDateFromBuffer(buffer, segmentStart + 6);
                }
                break;
            }

            if ((marker & 0xFF00) !== 0xFF00 || marker === 0xFFDA) {
                break;
            }

            const length = view.getUint16(offset, false);
            if (length < 2) break;
            offset += length;
        }
        return '';
    }

    // 2) TIFF direto ("II*\0" ou "MM\0*")
    if (magic2 === 0x4949 || magic2 === 0x4D4D) {
        return parseTiffDateFromBuffer(buffer, 0);
    }

    return '';
}

async function detectPhotoDate(file) {
    if (!file) return '';

    try {
        if (typeof createImageBitmap === 'function') {
            createImageBitmap(file)
                .then((bmp) => bmp.close && bmp.close())
                .catch(() => {});
        }

        const slice = file.slice(0, 262144);
        const buffer = await slice.arrayBuffer();
        const exifDate = extractExifDateFromArrayBuffer(buffer);
        if (exifDate) {
            return exifDate;
        }
    } catch (err) {
        console.warn('Leitura de metadados não disponível para este formato:', err);
    }

    if (file.lastModified) {
        return formatDateToInput(new Date(file.lastModified));
    }

    return '';
}

const photoFileInput = document.getElementById('photo-file');
const photoDateInput = document.getElementById('photo-date');

if (photoFileInput && photoDateInput) {
    photoFileInput.addEventListener('change', async () => {
        const file = photoFileInput.files && photoFileInput.files[0];
        if (!file) return;

        const detectedDate = await detectPhotoDate(file);
        if (detectedDate) {
            photoDateInput.value = detectedDate;
        }
    });
}

// --- ENVIO DIRETO PARA O FIRESTORE ---
const form = document.getElementById('photo-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!auth.currentUser) {
        showFeedback('delete', 'Login necessário', 'Faça login com a senha antes de enviar fotos.');
        openPasswordModal();
        return;
    }

    const fileInput = document.getElementById('photo-file');
    const dateInput = document.getElementById('photo-date').value;
    const descInput = document.getElementById('photo-desc').value.trim();
    const file = fileInput.files[0];

    if (!file) return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Comprimindo e enviando...';

    try {
        let compressedBase64 = await compressImage(file, 800, 0.7);

        if (compressedBase64.length > 700000) {
            compressedBase64 = await compressImage(file, 600, 0.55);
        }

        if (compressedBase64.length > 950000) {
            throw new Error('A foto ficou grande demais mesmo após compressão. Tente outra imagem.');
        }

        await db.collection('momentos').add({
            image: compressedBase64,
            date: dateInput,
            desc: descInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        form.reset();
        showFeedback('add', 'Momento adicionado!', 'Mais uma lembrança especial entrou na galeria.');
    } catch (error) {
        console.error('Erro ao salvar no Firestore:', error);
        showFeedback('delete', 'Erro ao enviar', error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Enviar para o Site';
    }
});

// --- MODAL DE FOTO, CONFIRMAÇÃO E EXCLUSÃO ---
function openDeleteConfirm(docId, desc) {
    pendingDelete = { docId, desc };
    if (confirmDeleteText) {
        confirmDeleteText.textContent = desc
            ? `Tem certeza que deseja excluir "${desc}"?`
            : 'Tem certeza que deseja excluir esta foto?';
    }
    if (confirmDeleteModal) {
        confirmDeleteModal.classList.add('open');
        confirmDeleteModal.setAttribute('aria-hidden', 'false');
    }
}

function closeDeleteConfirm() {
    pendingDelete = null;
    if (confirmDeleteModal) {
        confirmDeleteModal.classList.remove('open');
        confirmDeleteModal.setAttribute('aria-hidden', 'true');
    }
}

if (confirmDeleteClose) confirmDeleteClose.addEventListener('click', closeDeleteConfirm);
if (confirmDeleteBackdrop) confirmDeleteBackdrop.addEventListener('click', closeDeleteConfirm);
if (confirmDeleteCancel) confirmDeleteCancel.addEventListener('click', closeDeleteConfirm);

if (confirmDeleteYes) {
    confirmDeleteYes.addEventListener('click', async () => {
        if (!pendingDelete) return;
        const { docId, desc } = pendingDelete;
        closeDeleteConfirm();

        try {
            await db.collection('momentos').doc(docId).delete();
            if (currentDocId === docId) {
                closeModal();
            }
            showFeedback(
                'delete',
                'Foto excluída',
                desc ? `"${desc}" foi removida da galeria.` : 'O momento foi removido da galeria.'
            );
        } catch (error) {
            console.error('Erro ao excluir foto:', error);
            showFeedback('delete', 'Erro ao excluir', error.message);
        }
    });
}

function deletePhoto(docId, desc) {
    if (!auth.currentUser) {
        showFeedback('delete', 'Login necessário', 'Faça login com a senha para excluir fotos.');
        openPasswordModal();
        return;
    }
    openDeleteConfirm(docId, desc);
}

if (modalDelete) {
    modalDelete.addEventListener('click', () => {
        if (currentDocId) {
            deletePhoto(currentDocId, modalDesc.textContent);
        }
    });
}

function openModal(photo, formattedDate, fileName, docId) {
    currentDocId = docId;
    modalImg.src = photo.image;
    modalImg.alt = photo.desc || 'Momento';
    modalDate.textContent = formattedDate ? `📅 ${formattedDate}` : '';
    modalDesc.textContent = photo.desc || '';
    modalDownload.href = photo.image;
    modalDownload.download = fileName;
    if (modalDelete) {
        modalDelete.style.display = isAuthenticated ? '' : 'none';
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    currentDocId = null;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (confirmDeleteModal && confirmDeleteModal.classList.contains('open')) {
            closeDeleteConfirm();
        } else if (passwordModal.classList.contains('open')) {
            closePasswordModal();
        } else if (modal.classList.contains('open')) {
            closeModal();
        }
    }
});

// --- CARREGAR FOTOS DO FIRESTORE EM TEMPO REAL ---
const galleryGrid = document.getElementById('gallery-grid');

function renderGallery() {
    galleryGrid.innerHTML = '';

    if (!latestSnapshotDocs || latestSnapshotDocs.length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; color: #82828c;">Nenhum momento publicado ainda.</p>';
        return;
    }

    latestSnapshotDocs.forEach((doc, index) => {
        const photo = doc.data();

        let formattedDate = photo.date || '';
        if (photo.date) {
            const parts = photo.date.split('-');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }

        const fileName = `momento-${index + 1}.jpg`;
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <div>
                <img src="${photo.image}" alt="${photo.desc || 'Momento'}">
                <div class="photo-info">
                    <div class="photo-date">📅 ${formattedDate}</div>
                    <div class="photo-caption">${photo.desc || ''}</div>
                </div>
            </div>
            <div class="card-actions">
                <a href="${photo.image}" download="${fileName}" class="btn-download">Baixar Foto 📥</a>
                ${isAuthenticated ? '<button type="button" class="btn-delete">Excluir Foto 🗑️</button>' : ''}
            </div>
        `;

        card.querySelector('img').addEventListener('click', () => {
            openModal(photo, formattedDate, fileName, doc.id);
        });

        const deleteBtn = card.querySelector('.btn-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                deletePhoto(doc.id, photo.desc || '');
            });
        }

        galleryGrid.appendChild(card);
    });
}

db.collection('momentos')
    .orderBy('timestamp', 'desc')
    .onSnapshot(
        (snapshot) => {
            latestSnapshotDocs = snapshot.docs;
            renderGallery();
        },
        (error) => {
            console.error('Erro ao ler momentos:', error);
            galleryGrid.innerHTML = '<p style="grid-column: 1/-1; color: #ff6b81;">Não foi possível carregar as fotos. Verifique as regras do Cloud Firestore.</p>';
        }
    );