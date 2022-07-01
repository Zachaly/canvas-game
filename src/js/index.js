function addClickEvents(){
    window.addEventListener("click", (event) => {
        const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
        const velocity = {
            x: Math.cos(angle) * 3,
            y: Math.sin(angle) * 3
        };
    
        const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 7, "white", velocity);
        projectiles.push(projectile);
    
    });
}

function reset(){
    player = new Player(canvas.width / 2, canvas.height / 2, 20, "green");
    projectiles = [];
    enemies = [];
    particles = [];
    score.innerHTML = 0;
}

const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");
const startGameButton = document.getElementById("start");
const score = document.getElementById("score");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = new Player(canvas.width / 2, canvas.height / 2, 20, "green");
let projectiles = [];
let enemies = [];
let particles = [];
let scoreCount = 0;

startGameButton.addEventListener("click",() => {
    scoreCount = 0;
    reset();
    const container = document.getElementById("game-start");
    container.style.display = "none";
    animate();
    addClickEvents();
    setInterval(() => {
        spawnEnemy();
    }, 1000)
})