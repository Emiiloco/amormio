const API_KEY = '2e2e6d9bda78389ac280508cd3bda27b'; // <--- Pega tu llave de ImgBB aquí
const userGallery = document.getElementById('userGallery');
const imageInput = document.getElementById('imageInput');

// 1. CARGAR FOTOS GUARDADAS (Usaremos una lista manual en el código o LocalStorage por ahora)
// Para que sea compartido real, lo mejor es subir el link a una mini base de datos rápida
async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`https://api.imgbb.com{API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            const url = data.data.url;
            displayPhoto(url);
            savePhotoUrl(url); // Guardamos el link
            alert("¡Foto guardada en la nube! ❤️");
        }
    } catch (error) {
        alert("Error al subir la imagen.");
    }
}

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) uploadToImgBB(file);
});

function displayPhoto(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'user-photo';
    const randomRot = Math.floor(Math.random() * 10) - 5;
    img.style.transform = `rotate(${randomRot}deg)`;
    userGallery.appendChild(img);
}

// Para que Jazmín las vea, cuando tú las subas, añade el link aquí abajo manualmente:
const fotosCompartidas = [
    "https://i.ibb.co", 
];
fotosCompartidas.forEach(url => displayPhoto(url));
