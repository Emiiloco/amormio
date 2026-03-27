// 1. TU API KEY (Verifica que sea la correcta en ://imgbb.com)
const API_KEY = 'b975662820a8a95ce757459615a27c9f'; 

async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        console.log("Iniciando subida...");
        
        // CORRECCIÓN: La URL debe llevar /1/upload?key= antes de la API_KEY
        const response = await fetch("https://api.imgbb.com/1/upload" + API_KEY, {
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
            alert("Error del servidor: " + data.error.message);
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión. Asegúrate de que la foto no sea muy pesada.");
    }
}
