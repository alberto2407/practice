import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Efecto Máquina de Escribir (Pantalla 1) ---
    const textElement = document.getElementById('intro-text');
    const nextBtn = document.getElementById('btn-next');
    const introMessage = "Hoy es un día muy especial...\n\nQuería prepararte algo diferente para celebrar tu dia y espero que sea de tu agrado. ✨";

    let i = 0;
    function typeWriter() {
        if (i < introMessage.length) {
            if (introMessage.charAt(i) === '\n') {
                textElement.innerHTML += '<br>';
            } else {
                textElement.innerHTML += introMessage.charAt(i);
            }
            i++;
            setTimeout(typeWriter, 40);
        } else {
            nextBtn.classList.add('show');
        }
    }
    setTimeout(typeWriter, 500);

    // --- 2. Secuencia de la Pantalla 2 (El Pastel) ---
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const lightGlow = document.getElementById('light-glow');
    const cakeWrapper = document.getElementById('cake-wrapper');
    const birthdayText = document.getElementById('birthday-text');
    const bgMusic = document.getElementById('bg-music');

    // Botones y pantallas de la secuencia final
    const confettiBtn = document.getElementById('confetti-btn');
    const btnToMemories = document.getElementById('btn-to-memories'); // El botón nuevo
    const screen3 = document.getElementById('screen-3');
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeClosed = document.getElementById('envelope-closed');
    const letterContent = document.getElementById('letter-content');
    const btnRestart = document.getElementById('btn-restart');

    // Al dar clic en Siguiente (Pantalla 1 -> Pantalla 2)
    nextBtn.addEventListener('click', () => {
        // Iniciar Música
        bgMusic.volume = 0.5;
        bgMusic.play().catch(error => console.log("El navegador bloqueó el audio:", error));

        screen1.classList.remove('active');

        setTimeout(() => {
            screen2.classList.add('active');

            setTimeout(() => { lightGlow.classList.add('active'); }, 1500);
            setTimeout(() => { cakeWrapper.classList.add('active'); }, 3500);
            setTimeout(() => { birthdayText.classList.add('active'); }, 5500);

        }, 1000);
    });

    // --- 3. El Confeti y el botón a la carta ---
    confettiBtn.addEventListener('click', () => {
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#f7b2b7', '#6ec6ff', '#fff', '#ffb347']
        });

        confettiBtn.textContent = '¡Felicidades! 🎈';
        confettiBtn.disabled = true;

        // Mostramos el botón para ir al sobre
        btnToMemories.style.display = 'block';
        setTimeout(() => {
            btnToMemories.classList.add('show');
        }, 100);

        // Restauramos el botón del confeti después de 3 seg
        setTimeout(() => {
            confettiBtn.textContent = '¡Sorpresa!';
            confettiBtn.disabled = false;
        }, 3000);
    });

    // --- 4. Pasar de la Pantalla 2 a la Pantalla 3 (El Sobre) ---
    btnToMemories.addEventListener('click', () => {
        screen2.classList.remove('active');

        setTimeout(() => {
            screen3.classList.add('active');
            setTimeout(() => {
                envelopeContainer.classList.add('active');
            }, 500);
        }, 1000);
    });

    // --- 5. Abrir el Sobre ---
    envelopeClosed.addEventListener('click', () => {
        envelopeClosed.style.display = 'none';
        letterContent.style.display = 'block';
        btnRestart.style.display = 'block';
        btnRestart.classList.add('show');
    });

    // --- 6. Reiniciar todo ---
    btnRestart.addEventListener('click', () => {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        window.location.reload();
    });
});