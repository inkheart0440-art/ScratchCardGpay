function openEnvelope() {
    const envelope = document.getElementById('main-envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const cardScreen = document.getElementById('card-screen');

    // Run the CSS flap open animations
    envelope.classList.add('open');

    // Wait for the flap animation to complete, then slide to the scratch card
    setTimeout(() => {
        envelopeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeScreen.classList.add('hide');
            cardScreen.classList.remove('hide');
            if (typeof initCanvas === "function") {
                initCanvas();
            }
        }, 600);
    }, 1200);
}

const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d");
const container = document.querySelector(".invitation-container");

function initCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Solid elegant cover color
    ctx.fillStyle = "#ebdcc7"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fine card accent line border
    ctx.strokeStyle = "#dfd3bd";
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

    // New non-wedding description overlay
    ctx.fillStyle = "#6e6557";
    ctx.font = "italic 18px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal ✨", canvas.width / 2, canvas.height / 2);
}

// Ensure proper canvas setup on init
initCanvas();

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches.clientX : e.clientX;
    const clientY = e.touches ? e.touches.clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2); 
    ctx.fill();
}

// Event hooks
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", scratch);

window.addEventListener("resize", initCanvas);
