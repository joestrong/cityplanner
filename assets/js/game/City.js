import { randomBetween } from "../helpers/math.js";

export default class City
{

    constructor(container)
    {
        this.container = container;
        this.blockSize = 50;
        this.occupiedBlocks = [];
        this.emptyBlocks = [];
        this.blockTypes = [
			'house',
			'road',
			'wood'
		];
        this.init();
    }

    init()
    {
        this.emptyBlocks.push({
            x: Math.floor(this.container.clientWidth/2),
            y: Math.floor(this.container.clientHeight/2)
        });
    }

    createRandomBlock()
    {
        var random = randomBetween(0, this.blockTypes.length);
        var blockType = this.blockTypes[random];

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
        return this.emptyBlocks[randomBetween(0, (this.emptyBlocks.length - 1))];
    }

    scopeOutSurroundingBlocks(block)
    {
        var newBlocks = [
            { x: block.x - this.blockSize, y: block.y },
            { x: block.x + this.blockSize, y: block.y },
            { x: block.x, y: block.y - this.blockSize },
            { x: block.x, y: block.y + this.blockSize }
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