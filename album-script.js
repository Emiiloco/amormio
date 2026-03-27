// 1. TU API KEY DE IMGBB (Cópiala de ://imgbb.com)
const API_KEY = 'TU_API_KEY_AQUI'; 

const userGallery = document.getElementById('userGallery');
const imageInput = document.getElementById('imageInput');

// 2. CARGAR FOTOS GUARDADAS AL INICIAR
window.addEventListener('DOMContentLoaded', () => {
    const savedPhotos = JSON.parse(localStorage.getItem('ourCloudPhotos') || '[]');
    savedPhotos.forEach(url => displayPhoto(url));
});

// 3. FUNCIÓN PARA SUBIR A LA NUBE
async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        console.log("Subiendo...");
        const response = await fetch(`https://api.imgbb.com{API_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            const url = data.data.url;
            
            // Guardar el link en la memoria
            let savedPhotos = JSON.parse(localStorage.getItem('ourCloudPhotos') || '[]');
            savedPhotos.push(url);
            localStorage.setItem('ourCloudPhotos', JSON.stringify(savedPhotos));
            
            displayPhoto(url);
            alert("¡Foto guardada en la nube! ❤️");
        } else {
            console.error("Error de ImgBB:", data);
            alert("Error: " + data.error.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Hubo un error de red al subir.");
    }
}

// 4. ESCUCHAR CAMBIO (CORREGIDO)
if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0]; // <--- ESTO CORRIGE EL ERROR (seleccionamos el archivo 0)
        if (file) {
            uploadToImgBB(file);
        }
    });
}

// 5. MOSTRAR FOTO
function displayPhoto(src) {
    if(!userGallery) return;
    const img = document.createElement('img');
    img.src = src;
    img.className = 'user-photo';
    const randomRot = Math.floor(Math.random() * 10) - 5;
    img.style.transform = `rotate(${randomRot}deg)`;
    userGallery.appendChild(img);
}
