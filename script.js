const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer(-10);
    } else if (event.key === 'ArrowRight') {
        movePlayer(10);
    } else if (event.key === ' ') {
        shoot();
    }
});

function movePlayer(delta) {
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();
    const newLeft = playerRect.left + delta;

    if (newLeft >= gameAreaRect.left && newLeft + playerRect.width <= gameAreaRect.right) {
        player.style.left = newLeft - gameAreaRect.left + 'px';
    }
}

function shoot() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = player.style.left;
    bullet.style.bottom = '60px';
    gameArea.appendChild(bullet);

    const bulletInterval = setInterval(() => {
        bullet.style.bottom = (parseInt(bullet.style.bottom) + 10) + 'px';

        if (parseInt(bullet.style.bottom) > gameArea.offsetHeight) {
            clearInterval(bulletInterval);
            bullet.remove();
        }

        checkCollision(bullet, bulletInterval);
    }, 100);
}

function checkCollision(bullet, bulletInterval) {
    const targets = document.querySelectorAll('.target');
    targets.forEach(target => {
        if (isColliding(bullet, target)) {
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
            clearInterval(bulletInterval);
            bullet.remove();
            target.remove();
        }
    });
}

function isColliding(bullet, target) {
    const bulletRect = bullet.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return !(
        bulletRect.top > targetRect.bottom ||
        bulletRect.bottom < targetRect.top ||
        bulletRect.left > targetRect.right ||
        bulletRect.right < targetRect.left
    );
}

// Create targets
setInterval(() => {
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    target.style.top = '0px';
    gameArea.appendChild(target);

    const targetInterval = setInterval(() => {
        target.style.top = (parseInt(target.style.top) +
