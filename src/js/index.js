let animationId;
function animate(){
    animationId = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    for(projectile of projectiles){
        projectile.update();
    }
    enemies.forEach((enemy, eIndex) => {
        enemy.update();
        
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if(distance - enemy.radius - player.radius  < 1){
            cancelAnimationFrame(animationId);
        }

        projectiles.forEach((projectile, pIndex) => {
            const hypot = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if(hypot - enemy.radius - projectile.radius  < 1){
                setTimeout(() => {
                    enemies.splice(eIndex, 1);
                    projectiles.splice(pIndex, 1);
                }, 0);
            }
        });
    });
}

function spawnEnemy(){
    const radius = Math.random() * (35 - 5) + 10;

    let x ,y;

    if(Math.random() < 0.5){
        x = Math.random() < 0.5 ? -radius : canvas.width+radius;
        y = Math.random() * canvas.height;
    }
    else{
        x = Math.random() * canvas.width;
        y = Math.random() * 0.5 ? -radius : canvas.height+radius;
    }
    const color = "red";
    const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
    const velocity = {
        x: -Math.cos(angle),
        y: -Math.sin(angle)
    };

    const enemy = new Enemy(x, y, radius, color, velocity);
    enemies.push(enemy);
}

const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 20, "green");
const projectiles = [];
const enemies = [];

player.draw();

window.addEventListener("click", (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2
    };

    const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 7, "black", velocity);
    projectiles.push(projectile);

});

animate();

setInterval(() => {
    spawnEnemy();
}, 1000)