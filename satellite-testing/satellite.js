const obj = document.getElementById('satelliteObject');

let r_minor = window.innerWidth / 4;
let r_major = window.innerHeight / 4;

let center_x = window.innerWidth / 2;
let center_y = window.innerHeight / 2;

const omega = 0.001 // in radians / time

let theta = 0;

let posX = center_x + r_major * Math.cos(theta);
let posY = center_y + r_minor * Math.sin(theta);

let angle = 0;

const frames_per_second = 60;
const frame_interval = 1000 / frames_per_second;

let delta_time_multiplier = 1;
let delta_time = 0;

let previousTime = performance.now();

function orbit(currentTime){

    delta_time = currentTime - previousTime;
    theta = theta + omega * delta_time;
    angle = theta + Math.PI/2;
    posX = center_x + r_major * Math.cos(theta);
    posY = center_y + r_minor * Math.sin(theta);

    previousTime = currentTime;

    obj.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}rad)`;

    requestAnimationFrame(orbit);

};

function resizeOrbit(){
    center_x = window.innerWidth / 2;
    center_y = window.innerHeight / 2;
    r_minor = window.innerHeight/ 4;
    r_major = window.innerWidth / 4;

}

requestAnimationFrame(orbit);

window.addEventListener('resize', resizeOrbit);
