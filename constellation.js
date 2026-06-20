const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');

// Size the canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const connectionDistance = 150; // How close stars need to be to connect

// Create the Particle blueprint
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Radius of the star
        // Give them a random velocity between -0.5 and 0.5
        this.speedX = (Math.random() - 0.5); 
        this.speedY = (Math.random() - 0.5);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize 100 particles
for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
}

// The Animation Loop
function animate() {
    // Clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Check distance to all other particles to draw lines
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // The closer they are, the more opaque the line
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Call animate again for the next frame
    requestAnimationFrame(animate);
}

// Start the loop
animate();