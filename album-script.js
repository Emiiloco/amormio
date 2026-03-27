// 1. TU API KEY (Asegúrate de que NO tenga espacios antes o después)
const API_KEY = '2e2e6d9bda78389ac280508cd3bda27b'; 

const userGallery = document.getElementById('userGallery');
const imageInput = document.getElementById('imageInput');

// Cargar fotos guardadas localmente
window.addEventListener('DOMContentLoaded', () => {
    const savedPhotos = JSON.parse(localStorage.getItem('ourCloudPhotos') || '[]');
    savedPhotos.forEach(url => displayPhoto(url));
});

async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        console.log("Intentando subir...");
        const response = await fetch(`https://api.imgbb.com{API_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            const url = data.data.url;
            let savedPhotos = JSON.parse(localStorage.getItem('ourCloudPhotos') || '[]');
            savedPhotos.push(url);
            localStorage.setItem('ourCloudPhotos', JSON.stringify(savedPhotos));
            displayPhoto(url);
            alert("¡Foto guardada con éxito! ❤️");
        } else {
            // ESTO TE DIRÁ EL ERROR REAL
            alert("Error de ImgBB: " + data.error.message);
        }
    } catch (error) {
        alert("Error de red: Verifica tu conexión a internet.");
    }
}

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0]; // <--- ASEGÚRATE QUE TENGA EL [0]
        if (file) {
            uploadToImgBB(file);
        }
    });
}

function displayPhoto(src) {
    if(!userGallery) return;
    const img = document.createElement('img');
    img.src = src;
    img.className = 'user-photo';
    const randomRot = Math.floor(Math.random() * 10) - 5;
    img.style.transform = `rotate(${randomRot}deg)`;
    userGallery.appendChild(img);
}
