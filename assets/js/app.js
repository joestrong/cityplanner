"use strict";
(function() {

    var timerView = document.querySelector('#timer-view');
    var time = 3;
    var container = document.querySelector('body');
    timerView.textContent = time;
    window.setInterval(function() {
        time--;
        if (time === -1) {
            time = 3;
            create();
        }
        timerView.textContent = time;
    }, 1000);

    function create() {
        var random = randomBetween(0, 2);
        var classname;
        switch (random) {
            case 0:
                classname = 'building';
                break;
            case 1:
                classname = 'road';
                break;
            case 2:
                classname = 'wood';
                break;
        }
        var block = document.createElement('div');
        block.textContent = classname;
        block.className = 'block ' + classname;
        block.style.position = 'absolute';
        placeBlock(block);
    }

    function placeBlock(block) {
        var coords = getEmptySpace();
        block.style.left = coords.x + 'px';
        block.style.top = coords.y + 'px';
        container.appendChild(block);
    }

    function getEmptySpace() {
        return {
            x: 50 * randomBetween(0, 20),
            y: 50 * randomBetween(0, 20)
        };
    }

    function randomBetween(a, b) {
        return Math.round(Math.random() * (b - a)) + a;
    }

})();
