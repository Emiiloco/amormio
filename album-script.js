const imageInput = document.getElementById('imageInput');
const userGallery = document.getElementById('userGallery');

// Cargar fotos guardadas
window.addEventListener('DOMContentLoaded', () => {
    const savedPhotos = JSON.parse(localStorage.getItem('ourPhotos') || '[]');
    savedPhotos.forEach(src => displayPhoto(src));
});

// Guardar nueva foto
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;
            const savedPhotos = JSON.parse(localStorage.getItem('ourPhotos') || '[]');
            savedPhotos.push(base64Image);
            localStorage.setItem('ourPhotos', JSON.stringify(savedPhotos));
            displayPhoto(base64Image);
        };
        reader.readAsDataURL(file);
    }
});

function displayPhoto(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'user-photo';
    
    // Rotación aleatoria corregida
    const randomRot = Math.floor(Math.random() * 10) - 5;
    img.style.transform = `rotate(${randomRot}deg)`;
    
    userGallery.appendChild(img);
}

