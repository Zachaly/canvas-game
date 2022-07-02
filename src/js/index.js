// adds event for click on game start
function addClickEvent(){
    window.addEventListener("click", (event) => {
        const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
        const velocity = {
            x: Math.cos(angle) * 3 * projectileVelocityMultiplier,
            y: Math.sin(angle) * 3 * projectileVelocityMultiplier
        };
    
        const projectile = new Projectile(canvas.width / 2, canvas.height / 2, projectileSize, "white", velocity);
        projectiles.push(projectile);
    
    });
}

// resets player, projectiles and enemies
function reset(){
    player = new Player(canvas.width / 2, canvas.height / 2, playerSize, "green");
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

let player = new Player(canvas.width / 2, canvas.height / 2, playerSize, "green");
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
    addClickEvent();
    setInterval(() => {
        spawnEnemy();
    }, enemySpawnDelay)
})