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

    // Instruction Text Styling
    ctx.fillStyle = "#6e6557";
    ctx.font = "italic 18px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal Our Date ✨", canvas.width / 2, canvas.height / 2);
}

// Ensure proper canvas setup on init
initCanvas();

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    // Support standard pointer arrays for mobile screens
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2); // Stroke size thickness
    ctx.fill();
}

// Event hooks
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", scratch);

// Handle configuration resets if devices tilt
window.addEventListener("resize", initCanvas);
