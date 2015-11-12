export default class City
{

    constructor(container)
    {
        this.container = container;
    }

    createRandomBlock()
    {
        var random = this.randomBetween(0, 2);
        var blockType = '';
        switch (random) {
            case 0:
                blockType = 'building';
                break;
            case 1:
                blockType = 'road';
                break;
            case 2:
                blockType = 'wood';
                break;
        }
        var block = document.createElement('div');
        block.textContent = blockType;
        block.className = 'block ' + blockType;
        block.style.position = 'absolute';
        this.placeBlock(block);
    }

    placeBlock(block) {
        var coords = this.getEmptySpace();
        block.style.left = coords.x + 'px';
        block.style.top = coords.y + 'px';
        this.container.appendChild(block);
    }

    getEmptySpace() {
        return {
            x: 50 * this.randomBetween(0, 20),
            y: 50 * this.randomBetween(0, 20)
        };
    }

    randomBetween(a, b) {
        return Math.round(Math.random() * (b - a)) + a;
    }
}