
function Bomb(lifeTime) {
    this.lifeTime = lifeTime;

    this.die = function() {
        this.element.dispatchEvent(new Event('died'));
        this.element.parentNode.removeChild(this.element);
    }

    this.explode = function() {
        this.element.classList.add('exploded');
        this.element.dispatchEvent(new Event('exploded'));
    }
    
    this.tick = function () {
        this.lifeTime--;
        this.element.textContent = this.lifeTime;
        if (this.lifeTime <= 0) {
            this.explode();
        }
    }

    this.element = document.createElement('button');
    this.element.classList.add('bomb');
    this.element.textContent = this.lifeTime;
    this.element.tick = this.tick.bind(this);
    this.element.addEventListener('click', this.die.bind(this));

    this.element.style.left = Math.trunc(Math.random() * 100) + "%";
    this.element.style.top = Math.trunc(Math.random() * 100) + "%";
}