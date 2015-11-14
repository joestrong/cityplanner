export default class City
{

    constructor(container)
    {
        this.container = container;
        this.blockSize = 50;
        this.occupiedBlocks = [];
        this.emptyBlocks = [];
        this.init();
    }

    init()
    {
        this.emptyBlocks.push({
            x: 200,
            y: 200
        });
    }

    createRandomBlock()
    {
        var random = this.randomBetween(0, 2);
        var blockType = '';
        switch (random) {
            case 0:
                blockType = 'house';
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
        if (coords) {
            block.style.left = coords.x + 'px';
            block.style.top = coords.y + 'px';
            this.container.appendChild(block);
            this.moveBlockToOccupied(coords);
            this.scopeOutSurroundingBlocks(coords);
        }
    }

    getEmptySpace() {
        return this.emptyBlocks[this.randomBetween(0, (this.emptyBlocks.length - 1))];
    }

    randomBetween(a, b) {
        return Math.round(Math.random() * (b - a)) + a;
    }

    scopeOutSurroundingBlocks(block)
    {
        var newBlocks = [
            { x: block.x - 50, y: block.y },
            { x: block.x + 50, y: block.y },
            { x: block.x, y: block.y - 50 },
            { x: block.x, y: block.y + 50 }
        ];
        newBlocks = newBlocks.filter((block) => {
            var inBlocks = this.occupiedBlocks.filter((occupiedBlock) => {
                return occupiedBlock.x == block.x && occupiedBlock.y == block.y;
            });
            var inEmptyBlocks = this.emptyBlocks.filter((emptyBlock) => {
                return emptyBlock.x == block.x && emptyBlock.y == block.y;
            });
            return inBlocks.length + inEmptyBlocks.length == 0;
        });
        this.emptyBlocks = this.emptyBlocks.concat(newBlocks);
    }

    moveBlockToOccupied(block)
    {
        this.emptyBlocks = this.emptyBlocks.filter((emptyBlock) => {
            return emptyBlock.x != block.x || emptyBlock.y != block.y;
        });
        this.occupiedBlocks.push(block);
    }
}