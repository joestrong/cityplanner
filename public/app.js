(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ApplicationController = require('./controllers/ApplicationController.js');

var _ApplicationController2 = _interopRequireDefault(_ApplicationController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _ApplicationController2.default();

},{"./controllers/ApplicationController.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GameController = require('./GameController.js');

var _GameController2 = _interopRequireDefault(_GameController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationController = function ApplicationController() {
    _classCallCheck(this, ApplicationController);

    new _GameController2.default();
};

exports.default = ApplicationController;

},{"./GameController.js":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _City = require('../game/City.js');

var _City2 = _interopRequireDefault(_City);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = (function () {
    function GameController() {
        var _this = this;

        _classCallCheck(this, GameController);

        this.city = new _City2.default(document.querySelector('body'));
        this.time = 1;

        this.timerView = document.querySelector('#timer-view');

        this.updateHud();
        window.setInterval(function () {
            _this.time--;
            if (_this.time === -1) {
                _this.time = 1;
                _this.city.createRandomBlock();
            }
            _this.updateHud();
        }, 1000);
    }

    _createClass(GameController, [{
        key: 'updateHud',
        value: function updateHud() {
            this.timerView.textContent = this.time;
        }
    }]);

    return GameController;
})();

exports.default = GameController;

},{"../game/City.js":4}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _math = require('../helpers/math.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var City = (function () {
    function City(container) {
        _classCallCheck(this, City);

        this.container = container;
        this.blockSize = 50;
        this.occupiedBlocks = [];
        this.emptyBlocks = [];
        this.init();
    }

    _createClass(City, [{
        key: 'init',
        value: function init() {
            this.emptyBlocks.push({
                x: 200,
                y: 200
            });
        }
    }, {
        key: 'createRandomBlock',
        value: function createRandomBlock() {
            var random = (0, _math.randomBetween)(0, 2);
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
    }, {
        key: 'placeBlock',
        value: function placeBlock(block) {
            var coords = this.getEmptySpace();
            if (coords) {
                block.style.left = coords.x + 'px';
                block.style.top = coords.y + 'px';
                this.container.appendChild(block);
                this.moveBlockToOccupied(coords);
                this.scopeOutSurroundingBlocks(coords);
            }
        }
    }, {
        key: 'getEmptySpace',
        value: function getEmptySpace() {
            return this.emptyBlocks[(0, _math.randomBetween)(0, this.emptyBlocks.length - 1)];
        }
    }, {
        key: 'scopeOutSurroundingBlocks',
        value: function scopeOutSurroundingBlocks(block) {
            var _this = this;

            var newBlocks = [{ x: block.x - 50, y: block.y }, { x: block.x + 50, y: block.y }, { x: block.x, y: block.y - 50 }, { x: block.x, y: block.y + 50 }];
            newBlocks = newBlocks.filter(function (block) {
                var inBlocks = _this.occupiedBlocks.filter(function (occupiedBlock) {
                    return occupiedBlock.x == block.x && occupiedBlock.y == block.y;
                });
                var inEmptyBlocks = _this.emptyBlocks.filter(function (emptyBlock) {
                    return emptyBlock.x == block.x && emptyBlock.y == block.y;
                });
                return inBlocks.length + inEmptyBlocks.length == 0;
            });
            this.emptyBlocks = this.emptyBlocks.concat(newBlocks);
        }
    }, {
        key: 'moveBlockToOccupied',
        value: function moveBlockToOccupied(block) {
            this.emptyBlocks = this.emptyBlocks.filter(function (emptyBlock) {
                return emptyBlock.x != block.x || emptyBlock.y != block.y;
            });
            this.occupiedBlocks.push(block);
        }
    }]);

    return City;
})();

exports.default = City;

},{"../helpers/math.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomBetween = randomBetween;
function randomBetween(start, end) {
    return Math.round(Math.random() * (end - start)) + start;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9nYW1lL0NpdHkuanMiLCJhc3NldHMvanMvaGVscGVycy9tYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNFQSxxQ0FBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBUCxxQkFBcUIsR0FHdEMsU0FIaUIscUJBQXFCLEdBSXRDOzBCQUppQixxQkFBcUI7O0FBS2xDLGtDQUFvQixDQUFDO0NBQ3hCOztrQkFOZ0IscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQXJCLGNBQWM7QUFHL0IsYUFIaUIsY0FBYyxHQUkvQjs7OzhCQUppQixjQUFjOztBQUszQixZQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFTLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNyRCxZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzs7QUFFZCxZQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXZELFlBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqQixjQUFNLENBQUMsV0FBVyxDQUFDLFlBQU07QUFDckIsa0JBQUssSUFBSSxFQUFFLENBQUM7QUFDWixnQkFBSSxNQUFLLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNsQixzQkFBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2Qsc0JBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDakM7QUFDRCxrQkFBSyxTQUFTLEVBQUUsQ0FBQztTQUNwQixFQUFFLElBQUksQ0FB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Q25DOzs7V0FuRmdCLElBQUk7OztrQkFBSixJQUFJOzs7Ozs7OztRQ0ZULGFBQWEsR0FBYixhQUFhO0FBQXRCLFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDdEMsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFBLEFBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUM1RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXBwbGljYXRpb25Db250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQXBwbGljYXRpb25Db250cm9sbGVyLmpzJztcblxubmV3IEFwcGxpY2F0aW9uQ29udHJvbGxlcigpO1xuIiwiaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gJy4vR2FtZUNvbnRyb2xsZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbkNvbnRyb2xsZXJcbntcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIG5ldyBHYW1lQ29udHJvbGxlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDaXR5IGZyb20gJy4uL2dhbWUvQ2l0eS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sbGVyXG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmNpdHkgPSBuZXcgQ2l0eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuICAgICAgICB0aGlzLnRpbWUgPSAxO1xuXG4gICAgICAgIHRoaXMudGltZXJWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWVyLXZpZXcnKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUh1ZCgpO1xuICAgICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lLS07XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5jaXR5LmNyZWF0ZVJhbmRvbUJsb2NrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUh1ZCgpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIdWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy50aW1lclZpZXcudGV4dENvbnRlbnQgPSB0aGlzLnRpbWU7XG4gICAgfVxufSIsImltcG9ydCB7IHJhbmRvbUJldHdlZW4gfSBmcm9tIFwiLi4vaGVscGVycy9tYXRoLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpdHlcbntcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcbiAgICB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IDUwO1xuICAgICAgICB0aGlzLm9jY3VwaWVkQmxvY2tzID0gW107XG4gICAgICAgIHRoaXMuZW1wdHlCbG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzLnB1c2goe1xuICAgICAgICAgICAgeDogMjAwLFxuICAgICAgICAgICAgeTogMjAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVJhbmRvbUJsb2NrKClcbiAgICB7XG4gICAgICAgIHZhciByYW5kb20gPSByYW5kb21CZXR3ZWVuKDAsIDIpO1xuICAgICAgICB2YXIgYmxvY2tUeXBlID0gJyc7XG4gICAgICAgIHN3aXRjaCAocmFuZG9tKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYmxvY2tUeXBlID0gJ2hvdXNlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPSAncm9hZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgYmxvY2tUeXBlID0gJ3dvb2QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBibG9jay50ZXh0Q29udGVudCA9IGJsb2NrVHlwZTtcbiAgICAgICAgYmxvY2suY2xhc3NOYW1lID0gJ2Jsb2NrICcgKyBibG9ja1R5cGU7XG4gICAgICAgIGJsb2NrLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5wbGFjZUJsb2NrKGJsb2NrKTtcbiAgICB9XG5cbiAgICBwbGFjZUJsb2NrKGJsb2NrKSB7XG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLmdldEVtcHR5U3BhY2UoKTtcbiAgICAgICAgaWYgKGNvb3Jkcykge1xuICAgICAgICAgICAgYmxvY2suc3R5bGUubGVmdCA9IGNvb3Jkcy54ICsgJ3B4JztcbiAgICAgICAgICAgIGJsb2NrLnN0eWxlLnRvcCA9IGNvb3Jkcy55ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrVG9PY2N1cGllZChjb29yZHMpO1xuICAgICAgICAgICAgdGhpcy5zY29wZU91dFN1cnJvdW5kaW5nQmxvY2tzKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFbXB0eVNwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eUJsb2Nrc1tyYW5kb21CZXR3ZWVuKDAsICh0aGlzLmVtcHR5QmxvY2tzLmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgc2NvcGVPdXRTdXJyb3VuZGluZ0Jsb2NrcyhibG9jaylcbiAgICB7XG4gICAgICAgIHZhciBuZXdCbG9ja3MgPSBbXG4gICAgICAgICAgICB7IHg6IGJsb2NrLnggLSA1MCwgeTogYmxvY2sueSB9LFxuICAgICAgICAgICAgeyB4OiBibG9jay54ICsgNTAsIHk6IGJsb2NrLnkgfSxcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCwgeTogYmxvY2sueSAtIDUwIH0sXG4gICAgICAgICAgICB7IHg6IGJsb2NrLngsIHk6IGJsb2NrLnkgKyA1MCB9XG4gICAgICAgIF07XG4gICAgICAgIG5ld0Jsb2NrcyA9IG5ld0Jsb2Nrcy5maWx0ZXIoKGJsb2NrKSA9PiB7XG4gICAgICAgICAgICB2YXIgaW5CbG9ja3MgPSB0aGlzLm9jY3VwaWVkQmxvY2tzLmZpbHRlcigob2NjdXBpZWRCbG9jaykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvY2N1cGllZEJsb2NrLnggPT0gYmxvY2sueCAmJiBvY2N1cGllZEJsb2NrLnkgPT0gYmxvY2sueTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGluRW1wdHlCbG9ja3MgPSB0aGlzLmVtcHR5QmxvY2tzLmZpbHRlcigoZW1wdHlCbG9jaykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUJsb2NrLnggPT0gYmxvY2sueCAmJiBlbXB0eUJsb2NrLnkgPT0gYmxvY2sueTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGluQmxvY2tzLmxlbmd0aCArIGluRW1wdHlCbG9ja3MubGVuZ3RoID09IDA7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzID0gdGhpcy5lbXB0eUJsb2Nrcy5jb25jYXQobmV3QmxvY2tzKTtcbiAgICB9XG5cbiAgICBtb3ZlQmxvY2tUb09jY3VwaWVkKGJsb2NrKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbXB0eUJsb2NrcyA9IHRoaXMuZW1wdHlCbG9ja3MuZmlsdGVyKChlbXB0eUJsb2NrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlCbG9jay54ICE9IGJsb2NrLnggfHwgZW1wdHlCbG9jay55ICE9IGJsb2NrLnk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9jY3VwaWVkQmxvY2tzLnB1c2goYmxvY2spO1xuICAgIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gcmFuZG9tQmV0d2VlbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChlbmQgLSBzdGFydCkpICsgc3RhcnQ7XG59XG4iXX0=
