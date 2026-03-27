// 1. CONFIGURACIÓN DEL CONTADOR (26 Feb 2025)
const startDate = new Date('2025-02-26T00:00:00').getTime();

function updateCounter() {
    const now = new Date().getTime();
    const diff = now - startDate;

    // Calculamos tiempo transcurrido
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // Actualizamos los dos posibles tipos de contadores que tengas en el HTML
    const daysEl = document.getElementById('days');
    if(daysEl) {
        daysEl.innerText = d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    
    // Si usas el formato de texto "0d 0h..."
    const timerText = document.getElementById('timer');
    if(timerText && !daysEl) {
        timerText.innerText = `${d}d ${h}h ${m}m ${s}s`;
    }
}
setInterval(updateCounter, 1000);
updateCounter();

// --- LÓGICA ESTILO SPOTIFY LYRICS ---
document.addEventListener('DOMContentLoaded', () => {
    
    const handleSpotifyLyrics = () => {
        const lines = document.querySelectorAll('.lyric-line');
        
        // El "punto de activación" (80% de la altura de la pantalla)
        const triggerBottom = window.innerHeight * 0.8;
        // El "punto de apagado" (20% de la altura de la pantalla para que se apaguen al subir)
        const triggerTop = window.innerHeight * 0.2;

        lines.forEach(line => {
            const lineRect = line.getBoundingClientRect();
            const lineCenter = lineRect.top + lineRect.height / 2;

            // Si la línea está en la zona central de la pantalla, se ilumina
            if (lineCenter < triggerBottom && lineCenter > triggerTop) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleSpotifyLyrics);
    
    // Ejecutar una vez al cargar por si ya hay letras en pantalla
    handleSpotifyLyrics();
});

// --- IMPORTANTE: Asegúrate de que este bloque de scroll no borre el del Puzzle ---
// Si ya tienes un window.addEventListener('scroll', ...), 
// simplemente copia el contenido de handleSpotifyLyrics dentro de él.




// --- LÓGICA DEL PUZZLE RECONSTRUIDA ---
const rows = 5;
const cols = 5;
const pContainer = document.getElementById('puzzle-container');
const pPieces = [];

if (pContainer) {
    const w = pContainer.offsetWidth / cols;
    const h = pContainer.offsetHeight / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.width = w + 'px';
            piece.style.height = h + 'px';
            piece.style.left = (c * w) + 'px';
            piece.style.top = (r * h) + 'px';
            
            // Imagen de Snoopy (Asegúrate que el nombre sea exacto)
            piece.style.backgroundImage = "url('84147371-7524-43d0-afde-1a74df429217.JPG')";
            piece.style.backgroundSize = `${pContainer.offsetWidth}px ${pContainer.offsetHeight}px`;
            piece.style.backgroundPosition = `-${c * w}px -${r * h}px`;
            
            // Dispersión inicial (Caos total)
            const randomX = (Math.random() - 0.5) * 1500;
            const randomY = (Math.random() - 0.5) * 1500;
            const randomR = (Math.random() - 0.5) * 720;
            
            pPieces.push({ el: piece, x: randomX, y: randomY, r: randomR });
            pContainer.appendChild(piece);
        }
    }
}

// ÚNICO EVENTO DE SCROLL PARA EL PUZZLE
window.addEventListener('scroll', () => {
    const trigger = document.getElementById('trigger');
    if (!trigger) return;

    const scrollTop = window.pageYOffset;
    const triggerTop = trigger.offsetTop;
    const triggerHeight = trigger.offsetHeight - window.innerHeight;
    
    // Calculamos el progreso (0 a 1) dentro de la zona de Snoopy
    let progress = (scrollTop - triggerTop) / triggerHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    // Mover las piezas
    pPieces.forEach(p => {
        const curX = p.x * (1 - progress);
        const curY = p.y * (1 - progress);
        const curR = p.r * (1 - progress);
        
        p.el.style.transform = `translate(${curX}px, ${curY}px) rotate(${curR}deg)`;
        p.el.style.opacity = progress + 0.2;
    });

    // Mostrar el texto final solo cuando esté casi armado
    const finalText = document.querySelector('.final-text');
    if (progress > 0.9) {
        finalText.style.opacity = "1";
    } else {
        finalText.style.opacity = "0";
    }
});



// 4. BOTÓN DE DESEO Y CORAZONES
const magicBtn = document.getElementById('magicButton');
if (magicBtn) {
    magicBtn.addEventListener('click', function() {
        const msg = document.getElementById('wishMessage');
        if(msg) msg.classList.add('show');

        for (let i = 0; i < 50; i++) {
            createHeart();
        }
        this.style.background = "#ff143d";
    });
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-confetti');
    heart.innerText = '❤️'; 
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-5vh';
    
    const size = Math.random() * 1.5 + 1;
    heart.style.fontSize = size + 'rem';
    
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = duration + 's';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

// 5. ÁLBUM DE FOTOS (SUBIDA)
const imageInput = document.getElementById('imageInput');
const userGallery = document.getElementById('userGallery');

if (imageInput) {
    window.addEventListener('DOMContentLoaded', () => {
        const savedPhotos = JSON.parse(localStorage.getItem('ourPhotos') || '[]');
        savedPhotos.forEach(src => displayPhoto(src));
    });

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
