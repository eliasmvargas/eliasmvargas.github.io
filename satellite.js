// Boilerplate

const canvas = document.getElementById('satellite');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Classes

class Satellite{
    constructor(max_major, max_minor, orbitSpeed){
        // spacial parameters
        this.max_major = max_major; // maximum major-axis value - x
        this.max_minor = max_minor; // maximum minor-axis value - y
        this.angle = 0;
        this.speed = speed; 
        this.x_position = this.max_major;
        this.y_position = 0;
    }

    update(deltaTime, centerX, centerY){
        this.angle += this.orbitSpeed * deltaTime;
        this.x_position = this.max_major * Math.cos(this.angle);
        this.y_position = this.max_minor * Math.sin(this.angle);
        if(this.angle >= 2 * Math.PI){
            this.angle = 0;
        }
    }

    draw(context){
        context.beginPath();
        context.arc(this.x_position, this.y_position, 0, Math.PI * 2);
        context.fillStyle = #FFFFFF;
        context.fill();
    }

}

const Satellite = new Satellite(150, 100, 1);
let previousTime = 0;

function animateOrbit(currentTime){
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    Satellite.update(deltaTime, centerX, centerY);
    Satellite.draw(context);

    requestAnimationFrame(animateOrbit);
}