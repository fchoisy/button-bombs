/**
 * Main game script
 */

// Requires ./Bomb.js

function Game() {

    var isLost = false;
    var score = 0;
    
    var incrementScore = (function () {
        const scoreEl = document.getElementById('score');

        return function () {
            score++;
            scoreEl.textContent = score;
        }
    })();
    
    function loose() {
        isLost = true;
    }

    function init() {
        var canvas = document.getElementById('canvas');
        canvas.addEventListener('exploded', loose, true);
        canvas.addEventListener('died', incrementScore, true);
    }
    
    var update = (function () {
        var canvas = document.getElementById('canvas');
        var lastTime = window.performance.now();

        function addBomb() {
            var newLifetime = 2 + Math.floor(Math.random() * 4);
            var newBomb = new Bomb(newLifetime);
            canvas.appendChild(newBomb.element);
        }

        return function (tFrame) {
            var elapsedSeconds =  Math.floor((tFrame - lastTime) / 1000);
            for (let second = 0; second < elapsedSeconds; second++) {
                // update all bombs
                for (bomb of canvas.children) {
                    bomb.tick();
                }
                // add a new bomb
                const LOG_BASE = 3;
                let newBombsCount = Math.floor(Math.log(score + LOG_BASE) / Math.log(LOG_BASE))
                for (let i = 0; i < newBombsCount; i++) {
                    addBomb();
                }
                lastTime = tFrame;
            }
        }
    })();

    // Game loop
    this.main = function () {
        init();

        function loop(tFrame) {
            if (isLost) {
                let youLooseScreen = document.getElementById('you-loose');
                youLooseScreen.style.visibility = 'visible';
            } else {
                window.requestAnimationFrame(loop);
                update(tFrame);
            }
        }

        window.requestAnimationFrame(loop);
    };
}

const game = new Game();
game.main();