import { Star } from './star.js';
import { Satellite } from './satellite.js';

const star_canvas = document.getElementById('stars');
const star_ctx = star_canvas.getContext('2d');
const satellite_canvas = document.getElementById('satellite-orbit');
const satellite_ctx = satellite_canvas.getContext('2d');


star_canvas.width = window.innerWidth;
star_canvas.height = window.innerHeight;
satellite_canvas.width = window.innerWidth;
satellite_canvas.height = window.innerHeight;



window.addEventListener('resize', ()=>{
    star_canvas.width = window.innerWidth;
    star_canvas.height = window.innerHeight;
});

const starArray = [];
const numberOfStars = 150;

for(let i = 0; i < numberOfStars; i++){
    const x_position = Math.random() * star_canvas.width;
    const y_position = Math.random() * star_canvas.height;
    const size = Math.random() * 1.5 + 0.5;
    const max_opacity = Math.random()*0.6 + 0.4;
    const fade_rate = Math.random()*0.010 + 0.005;
    const star = new Star(max_opacity, size, x_position, y_position, fade_rate);
    starArray.push(star);
}

function animateStars(){
    star_ctx.clearRect(0, 0, star_canvas.width, star_canvas.height);  

    starArray.forEach(star =>{
        star.update();
        star.draw(star_ctx);

    });

    requestAnimationFrame(animateStars);
}


const mySatellite = new Satellite(250, 100, 0.002);
let previousTime = 0;

function animateOrbit(currentTime){
if (!previousTime) previousTime = currentTime; 

    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    satellite_ctx.clearRect(0, 0, satellite_canvas.width, satellite_canvas.height);

    const centerX = satellite_canvas.width / 2;
    const centerY = satellite_canvas.height / 2;

    mySatellite.update(deltaTime, centerX, centerY);
    mySatellite.draw(satellite_ctx);

    requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateStars);
requestAnimationFrame(animateOrbit);