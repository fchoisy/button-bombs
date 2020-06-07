var canvas = document.getElementById('canvas');
var lost = false;

var incrementScore = (function() {
    var score = 0;
    const scoreEl = document.getElementById('score');
    return function() {
        score++;
        scoreEl.textContent = score;
    }
})();

function Bomb(lifeTime, parent) {
    this.lifeTime = lifeTime;

    this.die = function () {
        incrementScore();
        this.element.parentNode.removeChild(this.element);
    }
    
    this.tick = function () {
        this.lifeTime--;
        if (this.lifeTime <= 0) {
            lost = true;
        } else {
            this.element.textContent = this.lifeTime;
        }
    }

    this.element = document.createElement('button');
    this.element.classList.add('bomb');
    this.element.textContent = this.lifeTime;
    this.element.tick = this.tick.bind(this);
    this.element.addEventListener('click', this.die.bind(this));

    this.element.style.left = Math.trunc(Math.random() * 100) + "px";
    this.element.style.top = Math.trunc(Math.random() * 100) + "%";

    parent.appendChild(this.element);
}

var update = (function () {
    var lastTime = window.performance.now(); // static var

    return function(tFrame) {
        // every second
        if (tFrame - lastTime > 1000) {
            // update all bombs
            for (bomb of canvas.children) {
                bomb.tick();
            }
            // add a new bomb
            new Bomb(3, canvas);
            lastTime = tFrame;
        }
    }
})();


// Game loop
;(function () {
    function loop(tFrame) {
        if (lost) {
            document.getElementById('you-loose').style.display = 'block';
        } else {
            window.requestAnimationFrame(loop);
            update(tFrame);
        }
    }

    window.requestAnimationFrame(loop);
})();
