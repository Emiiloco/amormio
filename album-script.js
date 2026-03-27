// 1. TU API KEY (Verifica que sea la correcta en ://imgbb.com)
const API_KEY = 'b975662820a8a95ce757459615a27c9f'; 

async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        console.log("Iniciando subida...");
        // Usamos una URL directa para evitar errores de red comunes
        const response = await fetch("https://api.imgbb.com" + API_KEY, {
            method: 'POST',
            body: formData,
            mode: 'cors' // Forzamos el modo seguro para Netlify
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
            alert("Error del servidor: " + data.error.message);
        }
    } catch (error) {
        // Si sale este error, es probable que la imagen sea muy grande o la API KEY esté mal
        console.error(error);
        alert("Error de conexión. Prueba con una foto menos pesada o revisa tu API KEY.");
    }
}
