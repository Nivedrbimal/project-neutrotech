const def = getId();
function getId() {
    const piGamePi = '141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141';
    let piIndex = 0;
    let mistakesAllowed = 3;

    let fg2_state = null;
    const opsToggle = document.getElementById('opsToggle');
    const opsContent = document.getElementById('opsContent');
    let ng_secret = null, ng_tries = 0;

    const snakeCanvas = document.getElementById("snakeCanvas");
    const snakeCtx = snakeCanvas.getContext("2d");
    const snakeScoreHolder = document.getElementById("snakeScore");
    const snakeLeftBtn = document.getElementById("leftSnake");
    const snakeUpBtn = document.getElementById("upSnake");
    const snakeRightBtn = document.getElementById("rightSnake");
    const snakeDownBtn = document.getElementById("downSnake");
    const snakeStartBtn = document.getElementById("startSnakeBtn");
    const snakePauseBtn = document.getElementById("pauseSnakeBtn");
    const snakeSize = Math.floor(window.innerHeight * 0.65);
    let snakeBox = Math.floor(snakeSize / 25);
    let snake, snakeDirection, snakeFood, snakeScore, snakeFoodsEaten;
    let snakeSpecialFood = null;
    let snakeHighScore;
    let snakeSpecialFoodTimer = null;
    let snakeSpecialFoodTime = 5000;
    let snakePaused = false;
    let snakeLastFrameTime = 0;
    let snakeMoveDelay = 100;
    let snakeAccumulatedTime = 0;
    let snakeRunning = false;

    const jetShooterCanvas = document.getElementById('jetShooterCanvas');
    const jetShooterCtx = jetShooterCanvas.getContext("2d");
    const jetShooterScoreHolder = document.getElementById("jetShooterScore");
    const jetShooterShieldHolder = document.getElementById("jetShooterShield");
    const jetShooterBulletHolder = document.getElementById("jetShooterBullets");
    const jetShooterLeftBtn = document.getElementById("leftJetShooter");
    const jetShooterRightBtn = document.getElementById("rightJetShooter");
    const jetShooterShootBtn = document.getElementById("shootJetShooter");
    const jetShooterStartBtn = document.getElementById("startJetShooterBtn");
    const jetShooterPauseBtn = document.getElementById("pauseJetShooterBtn");
    const jetShooterSize = Math.floor(window.innerHeight * 0.65);
    jetShooterCanvas.width = 100 * Math.floor(jetShooterSize / 100);
    jetShooterCanvas.height = 100 * Math.floor(jetShooterSize / 100);
    let jetShooterBox = Math.floor(jetShooterCanvas.width / 100);
    let jetShooterFrameId = null;
    let gameFrameId = null;
    let jetShooterMessage = "";
    let jetShooterMessageTimeout = null;
    let movement = 0;
    const keys = {};
    let lastKeyPressed = null;
    let jetShooterHighScore;
    let jetShooter, jetShooterBullets, jetShooterEnemies, jetShooterShields, jetShooterBulletBarrel, jetShooterScore;
    let jetShooterPaused = false;
    let jetShooterRunning = false;
    let isShooting = false;
    let jetShooterLastFrameTime = 0;
    let lastShotTime = 0;
    const FIRE_RATE = 100;
    let jetShooterEnemyTimer = 0;
    let jetShooterShieldTimer = 0;
    let jetShooterBulletTimer = 0;
    let jetShooterEnemySpawnRate = 2000;
    let jetShooterBulletBarrelRate = 10000;
    let jetShooterShieldSpawnRate = 15000;
    let jetShooterHasShield = 0;
    let jetShooterBulletRemaining = 100;

    const neutropolisGame = document.getElementById('neutropolisGame');
    const ngmi = document.getElementById('ngmi');
    const jngr = document.getElementById('jngr');
    const cngr = document.getElementById('cngr');
    const ngrc = document.getElementById('ngrc');

    return {
        piGamePi, piIndex, mistakesAllowed,
        fg2_state, opsToggle, opsContent, ng_secret, ng_tries,
        snakeCanvas, snakeCtx, snakeScoreHolder, snakeLeftBtn, snakeUpBtn, snakeRightBtn, snakeDownBtn, snakeStartBtn, snakePauseBtn, snakeSize, snakeBox, snake, snakeDirection, snakeFood, snakeScore, snakeFoodsEaten, snakeSpecialFood, snakeHighScore, snakeSpecialFoodTimer, snakeSpecialFoodTime, snakePaused, snakeLastFrameTime, snakeMoveDelay, snakeAccumulatedTime, snakeRunning,
        jetShooterCanvas, jetShooterCtx, jetShooterScoreHolder, jetShooterShieldHolder, jetShooterBulletHolder, jetShooterLeftBtn, jetShooterRightBtn, jetShooterShootBtn, jetShooterStartBtn, jetShooterPauseBtn, jetShooterSize, jetShooterBox, jetShooterFrameId, gameFrameId, jetShooterMessage, jetShooterMessageTimeout, movement, keys, lastKeyPressed, jetShooterHighScore, jetShooter, jetShooterBullets, jetShooterEnemies, jetShooterShields, jetShooterBulletBarrel, jetShooterScore, jetShooterPaused, jetShooterRunning, isShooting, jetShooterLastFrameTime, lastShotTime, FIRE_RATE, jetShooterEnemyTimer, jetShooterShieldTimer, jetShooterBulletTimer, jetShooterEnemySpawnRate, jetShooterBulletBarrelRate, jetShooterShieldSpawnRate, jetShooterHasShield, jetShooterBulletRemaining,
        neutropolisGame, ngmi, jngr, cngr, ngrc
    }
}
