// standard game settings
let playerSize = 20;
let minEnemySize = 10;
let maxEnemySize = 40;
let enemySpawnDelay = 1000;
let projectileVelocityMultiplier = 1;
let enemyVelocityMultiplier = 1;
let projectileSize = 7;
let projectileDamage = 10;

// update displayed settings values
function updateSettings(){
    document.getElementById("player-size").innerHTML = playerSize;
    document.getElementById("min-enemy-size").innerHTML = minEnemySize;
    document.getElementById("max-enemy-size").innerHTML = maxEnemySize;
    document.getElementById("enemy-spawn-delay").innerHTML = (enemySpawnDelay / 1000).toFixed(1);
    document.getElementById("enemy-velocity").innerHTML = enemyVelocityMultiplier.toFixed(1);
    document.getElementById("projectile-velocity").innerHTML = projectileVelocityMultiplier.toFixed(1);
    document.getElementById("projectile-size").innerHTML = projectileSize.toFixed(1);
    document.getElementById("projectile-damage").innerHTML = projectileDamage;
}

// function to check if the can be changed
function checkIfIsInRange(checkValue, minValue, maxValue, change){
    return ((checkValue <= minValue && change < 0) || (checkValue >= maxValue && change > 0));
}

// functions to change settings
function changePlayerSize(change){
    if(checkIfIsInRange(playerSize, 10, 30, change)){
        return;
    }
    playerSize += change;
}

function changeMinEnemySize(change){
    if(checkIfIsInRange(minEnemySize, 10, maxEnemySize, change)){
        return;
    }
    minEnemySize += change;
}

function changeMaxEnemySize(change){
    if(checkIfIsInRange(maxEnemySize, minEnemySize, 60, change)){
        return;
    }
    maxEnemySize += change;
}

function changeEnemySpawnDelay(change){
    if(checkIfIsInRange(enemySpawnDelay, 500, 2500, change)){
        return;
    }
    enemySpawnDelay += change;
}

function changeProjectileVelocity(change){
    if(checkIfIsInRange(projectileVelocityMultiplier, 0.6, 2.5, change)){
        return;
    }

    projectileVelocityMultiplier += change;
}

function changeEnemyVelocity(change){
    if(checkIfIsInRange(enemyVelocityMultiplier, 0.6, 2.5, change)){
        return;
    }
    enemyVelocityMultiplier += change;
}

function changeProjectileSize(change){
    if(checkIfIsInRange(projectileSize, 1, 15, change)){
        return;
    }
    projectileSize += change;
}

function changeProjectileDamage(change){
    if(checkIfIsInRange(projectileDamage, 5, 20, change)){
        return;
    }
    projectileDamage += change;
}


function setIncreaseAndDecrease(id, value, func){
    const inc = document.getElementById(`${id}-inc`);
    inc.addEventListener("click", () => func(value));
    inc.addEventListener("click", () => updateSettings());

    const dec = document.getElementById(`${id}-dec`);
    dec.addEventListener("click", () => func(-value));
    dec.addEventListener("click", () => updateSettings());
}

function setButtons(){
    setIncreaseAndDecrease("player-size", 2, changePlayerSize);
    setIncreaseAndDecrease("min-enemy-size", 5, changeMinEnemySize);
    setIncreaseAndDecrease("max-enemy-size", 5, changeMaxEnemySize);
    setIncreaseAndDecrease("enemy-velocity", 0.1, changeEnemyVelocity);
    setIncreaseAndDecrease("enemy-spawn-delay", 100, changeEnemySpawnDelay);
    setIncreaseAndDecrease("projectile-velocity", 0.1, changeProjectileVelocity);
    setIncreaseAndDecrease("projectile-size", 1, changeProjectileSize);
    setIncreaseAndDecrease("projectile-damage", 1, changeProjectileDamage)
}

updateSettings();
setButtons();