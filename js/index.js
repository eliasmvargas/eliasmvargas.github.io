import { Star } from './star.js';

const star_canvas = document.getElementById('stars');
const star_ctx = star_canvas.getContext('2d');


star_canvas.width = window.innerWidth;
star_canvas.height = window.innerHeight;



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

requestAnimationFrame(animateStars);

window.addEventListener('resize', () => {
    // Update the stars
    star_canvas.width = window.innerWidth;
    star_canvas.height = window.innerHeight;
    
});
