document.addEventListener("DOMContentLoaded", () => {
    // === Contrôle de la vidéo ===
    const video = document.getElementById("noelVideo");
    const volumeRange = document.getElementById("volumeRange");
    const muteButton = document.getElementById("muteButton");

    // Définir le volume initial
    video.volume = 0.5;

    // Contrôle du volume via la barre coulissante
    volumeRange.addEventListener("input", (event) => {
        video.volume = event.target.value;
        muteButton.textContent = video.volume === 0 ? "🔇" : "🔊";
    });

    // Bouton de sourdine
    muteButton.addEventListener("click", () => {
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? "🔇" : "🔊";
    });

    // === Flocons de neige ===
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes = [];

    function createSnowflakes() {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 4 + 1;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;

        snowflakes.push({ x, y, radius, speed, opacity });
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();

        for (const snowflake of snowflakes) {
            ctx.moveTo(snowflake.x, snowflake.y);
            ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
        }

        ctx.fill();
    }

    function updateSnowflakes() {
        for (const snowflake of snowflakes) {
            snowflake.y += snowflake.speed;

            if (snowflake.y > height) {
                snowflake.y = 0;
                snowflake.x = Math.random() * width;
            }
        }
    }

    function loop() {
        drawSnowflakes();
        updateSnowflakes();
        requestAnimationFrame(loop);
    }

    function initSnowflakes() {
        for (let i = 0; i < 100; i++) {
            createSnowflakes();
        }
        loop();
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    initSnowflakes();

    // === Ouverture des images dans un modal ===
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".modal .close");

    // Ajoutez un écouteur d'événements sur chaque image de blog
    document.querySelectorAll(".blog-image").forEach((image) => {
        image.addEventListener("click", () => {
            modal.style.display = "block";
            modalImage.src = image.dataset.full;
        });
    });

    // Fermez le modal lorsque l'utilisateur clique sur la croix
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fermez le modal lorsque l'utilisateur clique en dehors de l'image
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
