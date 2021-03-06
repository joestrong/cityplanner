import City from '../game/City.js';

export default class GameController
{

    constructor()
    {
        this.city = new City(document.querySelector('#container'));
        this.time = 1;

        this.timerView = document.querySelector('#timer-view');

        this.updateHud();
        window.setInterval(() => {
            this.time--;
            if (this.time === -1) {
                this.time = 1;
                this.city.createRandomBlock();
            }
            this.updateHud();
        }, 1000);
    }

    updateHud()
    {
        this.timerView.textContent = this.time;
    }
}