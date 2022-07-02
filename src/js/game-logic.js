let animationId;

function animate(){
    animationId = requestAnimationFrame(animate);
    // elements leave a trail while moving
    context.fillStyle = "rgba(0, 0, 0, 0.2)"
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    
    projectiles.forEach((projectile, index) => {
        projectile.update();

        // make projectiles disappear when they are out of canvas
        if(projectile.x + projectile.radius < 0 || projectile.y + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width || projectile.y - projectile.radius > canvas.height){
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    })

    enemies.forEach((enemy, eIndex) => {
        enemy.update();
        
        // game over of enemy gets to the player
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if(distance - enemy.radius - player.radius  < 1){
            cancelAnimationFrame(animationId);
            const container = document.getElementById("game-start");
            container.style.display = "flex";

            const finalScore = document.getElementById("final-score");
            finalScore.innerHTML = scoreCount;
        }

        // checks if any projectile hits current enemy
        projectiles.forEach((projectile, pIndex) => {
            const hypot = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if(hypot - enemy.radius - projectile.radius  < 1){

                scoreCount += 100;
                score.innerHTML = scoreCount;

                for(let i = 0; i < enemy.radius * 2; i++){
                    particles.push(new Particle(projectile.x, projectile.y, enemy.color));
                }

                // enemy shrinks or get removed on hit
                if(enemy.radius - projectileDamage > 10){
                    gsap.to(enemy, {
                        radius: enemy.radius - projectileDamage
                    })
                    setTimeout(() => {
                        projectiles.splice(pIndex, 1);
                    }, 0);
                } else {
                    scoreCount += 250;
                    score.innerHTML = scoreCount;
                    setTimeout(() => {
                        enemies.splice(eIndex, 1);
                        projectiles.splice(pIndex, 1);
                    }, 0);
                }
            }
        });
    });

    // updates particles, and removes them if they are not visible
    particles.forEach((particle, index) =>{
        particle.update();
        if(particle.alpha <= 0){
            particles.splice(index, 1);
        }
    })
}

// creates an enemy in random position on the edge of canvas
function spawnEnemy(){
    const radius = Math.random() * (maxEnemySize - minEnemySize) + minEnemySize;

    let x ,y;

    if(Math.random() < 0.5){
        x = Math.random() < 0.5 ? -radius : canvas.width+radius;
        y = Math.random() * canvas.height;
    }
    else{
        x = Math.random() * canvas.width;
        y = Math.random() * 0.5 ? -radius : canvas.height+radius;
    }
    const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
    const velocity = {
        x: -Math.cos(angle) * enemyVelocityMultiplier,
        y: -Math.sin(angle) * enemyVelocityMultiplier
    };

    const enemy = new Enemy(x, y, radius, velocity);
    enemies.push(enemy);
}