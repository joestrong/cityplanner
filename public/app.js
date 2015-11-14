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
            return this.emptyBlocks[this.randomBetween(0, this.emptyBlocks.length - 1)];
        }
    }, {
        key: 'randomBetween',
        value: function randomBetween(a, b) {
            return Math.round(Math.random() * (b - a)) + a;
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9nYW1lL0NpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLHFDQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0FQLHFCQUFxQixHQUd0QyxTQUhpQixxQkFBcUIsR0FJdEM7MEJBSmlCLHFCQUFxQjs7QUFLbEMsa0NBQW9CLENBQUM7Q0FDeEI7O2tCQU5nQixxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBckIsY0FBYztBQUcvQixhQUhpQixjQUFjLEdBSS9COzs7OEJBSmlCLGNBQWM7O0FBSzNCLFlBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQVMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFlBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOztBQUVkLFlBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkQsWUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLGNBQU0sQ0FBQyxXQUFXLENBQUMsWUFBTTtBQUNyQixrQkFBSyxJQUFJLEVBQUUsQ0FBQztBQUNaLGdCQUFJLE1BQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xCLHNCQUFLLElBQUksR0FBRyxDQUFDLENBQUM7QUFDZCxzQkFBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUNqQztBQUNELGtCQUFLLFNBQVMsRUFBRSxDQUFDO1NBQ3BCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDWjs7aUJBbkJnQixjQUFjOztv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LFVBQVUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM3RCxDQUFDLENBQUM7QUFDSCxnQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7OztXQXZGZ0IsSUFBSTs7O2tCQUFKLElBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcGxpY2F0aW9uQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyc7XG5cbm5ldyBBcHBsaWNhdGlvbkNvbnRyb2xsZXIoKTtcbiIsImltcG9ydCBHYW1lQ29udHJvbGxlciBmcm9tICcuL0dhbWVDb250cm9sbGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25Db250cm9sbGVyXG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBuZXcgR2FtZUNvbnRyb2xsZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2l0eSBmcm9tICcuLi9nYW1lL0NpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbGxlclxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jaXR5ID0gbmV3IENpdHkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcbiAgICAgICAgdGhpcy50aW1lID0gMTtcblxuICAgICAgICB0aGlzLnRpbWVyVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lci12aWV3Jyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZS0tO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY2l0eS5jcmVhdGVSYW5kb21CbG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSHVkKClcbiAgICB7XG4gICAgICAgIHRoaXMudGltZXJWaWV3LnRleHRDb250ZW50ID0gdGhpcy50aW1lO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDaXR5XG57XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpXG4gICAge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSA1MDtcbiAgICAgICAgdGhpcy5vY2N1cGllZEJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzID0gW107XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbXB0eUJsb2Nrcy5wdXNoKHtcbiAgICAgICAgICAgIHg6IDIwMCxcbiAgICAgICAgICAgIHk6IDIwMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVSYW5kb21CbG9jaygpXG4gICAge1xuICAgICAgICB2YXIgcmFuZG9tID0gdGhpcy5yYW5kb21CZXR3ZWVuKDAsIDIpO1xuICAgICAgICB2YXIgYmxvY2tUeXBlID0gJyc7XG4gICAgICAgIHN3aXRjaCAocmFuZG9tKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYmxvY2tUeXBlID0gJ2hvdXNlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPSAncm9hZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgYmxvY2tUeXBlID0gJ3dvb2QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBibG9jay50ZXh0Q29udGVudCA9IGJsb2NrVHlwZTtcbiAgICAgICAgYmxvY2suY2xhc3NOYW1lID0gJ2Jsb2NrICcgKyBibG9ja1R5cGU7XG4gICAgICAgIGJsb2NrLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5wbGFjZUJsb2NrKGJsb2NrKTtcbiAgICB9XG5cbiAgICBwbGFjZUJsb2NrKGJsb2NrKSB7XG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLmdldEVtcHR5U3BhY2UoKTtcbiAgICAgICAgaWYgKGNvb3Jkcykge1xuICAgICAgICAgICAgYmxvY2suc3R5bGUubGVmdCA9IGNvb3Jkcy54ICsgJ3B4JztcbiAgICAgICAgICAgIGJsb2NrLnN0eWxlLnRvcCA9IGNvb3Jkcy55ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrVG9PY2N1cGllZChjb29yZHMpO1xuICAgICAgICAgICAgdGhpcy5zY29wZU91dFN1cnJvdW5kaW5nQmxvY2tzKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFbXB0eVNwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eUJsb2Nrc1t0aGlzLnJhbmRvbUJldHdlZW4oMCwgKHRoaXMuZW1wdHlCbG9ja3MubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICByYW5kb21CZXR3ZWVuKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpICsgYTtcbiAgICB9XG5cbiAgICBzY29wZU91dFN1cnJvdW5kaW5nQmxvY2tzKGJsb2NrKVxuICAgIHtcbiAgICAgICAgdmFyIG5ld0Jsb2NrcyA9IFtcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCAtIDUwLCB5OiBibG9jay55IH0sXG4gICAgICAgICAgICB7IHg6IGJsb2NrLnggKyA1MCwgeTogYmxvY2sueSB9LFxuICAgICAgICAgICAgeyB4OiBibG9jay54LCB5OiBibG9jay55IC0gNTAgfSxcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCwgeTogYmxvY2sueSArIDUwIH1cbiAgICAgICAgXTtcbiAgICAgICAgbmV3QmxvY2tzID0gbmV3QmxvY2tzLmZpbHRlcigoYmxvY2spID0+IHtcbiAgICAgICAgICAgIHZhciBpbkJsb2NrcyA9IHRoaXMub2NjdXBpZWRCbG9ja3MuZmlsdGVyKChvY2N1cGllZEJsb2NrKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9jY3VwaWVkQmxvY2sueCA9PSBibG9jay54ICYmIG9jY3VwaWVkQmxvY2sueSA9PSBibG9jay55O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaW5FbXB0eUJsb2NrcyA9IHRoaXMuZW1wdHlCbG9ja3MuZmlsdGVyKChlbXB0eUJsb2NrKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5QmxvY2sueCA9PSBibG9jay54ICYmIGVtcHR5QmxvY2sueSA9PSBibG9jay55O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaW5CbG9ja3MubGVuZ3RoICsgaW5FbXB0eUJsb2Nrcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW1wdHlCbG9ja3MgPSB0aGlzLmVtcHR5QmxvY2tzLmNvbmNhdChuZXdCbG9ja3MpO1xuICAgIH1cblxuICAgIG1vdmVCbG9ja1RvT2NjdXBpZWQoYmxvY2spXG4gICAge1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzID0gdGhpcy5lbXB0eUJsb2Nrcy5maWx0ZXIoKGVtcHR5QmxvY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eUJsb2NrLnggIT0gYmxvY2sueCB8fCBlbXB0eUJsb2NrLnkgIT0gYmxvY2sueTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub2NjdXBpZWRCbG9ja3MucHVzaChibG9jayk7XG4gICAgfVxufSJdfQ==
