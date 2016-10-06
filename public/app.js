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

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _City = require('../game/City.js');

var _City2 = _interopRequireDefault(_City);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = function () {
    function GameController() {
        var _this = this;

        _classCallCheck(this, GameController);

        this.city = new _City2.default(document.querySelector('#container'));
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
        }, 10);
    }

    _createClass(GameController, [{
        key: 'updateHud',
        value: function updateHud() {
            this.timerView.textContent = this.time;
        }
    }]);

    return GameController;
}();

exports.default = GameController;

},{"../game/City.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require('../helpers/math.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var City = function () {
    function City(container) {
        _classCallCheck(this, City);

        this.container = container;
        this.blockSize = 10;
        this.occupiedBlocks = [];
        this.emptyBlocks = [];
        this.blockTypes = ['house', 'road', 'wood'];
        this.init();
    }

    _createClass(City, [{
        key: 'init',
        value: function init() {
            this.emptyBlocks.push({
                x: Math.floor(this.container.clientWidth / 2),
                y: Math.floor(this.container.clientHeight / 2)
            });
        }
    }, {
        key: 'createRandomBlock',
        value: function createRandomBlock() {
            var random = (0, _math.randomBetween)(0, this.blockTypes.length);
            var blockType = this.blockTypes[random];

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

            var newBlocks = [{ x: block.x - this.blockSize, y: block.y }, { x: block.x + this.blockSize, y: block.y }, { x: block.x, y: block.y - this.blockSize }, { x: block.x, y: block.y + this.blockSize }];
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
}();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9nYW1lL0NpdHkuanMiLCJhc3NldHMvanMvaGVscGVycy9tYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQ0ZBOzs7Ozs7OztJQUVxQixxQixHQUdqQixpQ0FDQTtBQUFBOztBQUNJO0FBQ0gsQzs7a0JBTmdCLHFCOzs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7SUFFcUIsYztBQUdqQiw4QkFDQTtBQUFBOztBQUFBOztBQUNJLGFBQUssSUFBTCxHQUFZLG1CQUFTLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFULENBQVo7QUFDQSxhQUFLLElBQUwsR0FBWSxDQUFaOztBQUVBLGFBQUssU0FBTCxHQUFpQixTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBakI7O0FBRUEsYUFBSyxTQUFMO0FBQ0EsZUFBTyxXQUFQLENBQW1CLFlBQU07QUFDckIsa0JBQUssSUFBTDtBQUNBLGdCQUFJLE1BQUssSUFBTCxLQUFjLENBQUMsQ0FBbkIsRUFBc0I7QUFDbEIsc0JBQUssSUFBTCxHQUFZLENBQVo7QUFDQSxzQkFBSyxJQUFMLENBQVUsaUJBQVY7QUFDSDtBQUNELGtCQUFLLFNBQUw7QUFDSCxTQVBELEVBT0csRUFQSDtBQVFIOzs7O29DQUdEO0FBQ0ksaUJBQUssU0FBTCxDQUFlLFdBQWYsR0FBNkIsS0FBSyxJQUFsQztBQUNIOzs7Ozs7a0JBeEJnQixjOzs7Ozs7Ozs7OztBQ0ZyQjs7OztJQUVxQixJO0FBR2pCLGtCQUFZLFNBQVosRUFDQTtBQUFBOztBQUNJLGFBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGFBQUssU0FB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LEVBQ3BCO0FBQ0ksaUJBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FBd0IsVUFBQyxVQUFELEVBQWdCO0FBQ3ZELHVCQUFPLFdBQVcsQ0FBWCxJQUFnQixNQUFNLENBQXRCLElBQTJCLFdBQVcsQ0FBWCxJQUFnQixNQUFNLENBQXhEO0FBQ0gsYUFGa0IsQ0FBbkI7QUFHQSxpQkFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO0FBQ0g7Ozs7OztrQkE5RWdCLEk7Ozs7Ozs7O1FDRkwsYSxHQUFBLGE7QUFBVCxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsR0FBOUIsRUFBbUM7QUFDdEMsV0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsTUFBaUIsTUFBTSxLQUF2QixDQUFYLElBQTRDLEtBQW5EO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcGxpY2F0aW9uQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyc7XG5cbm5ldyBBcHBsaWNhdGlvbkNvbnRyb2xsZXIoKTtcbiIsImltcG9ydCBHYW1lQ29udHJvbGxlciBmcm9tICcuL0dhbWVDb250cm9sbGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25Db250cm9sbGVyXG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBuZXcgR2FtZUNvbnRyb2xsZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2l0eSBmcm9tICcuLi9nYW1lL0NpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbGxlclxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jaXR5ID0gbmV3IENpdHkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpKTtcbiAgICAgICAgdGhpcy50aW1lID0gMTtcblxuICAgICAgICB0aGlzLnRpbWVyVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lci12aWV3Jyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZS0tO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY2l0eS5jcmVhdGVSYW5kb21CbG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIHVwZGF0ZUh1ZCgpXG4gICAge1xuICAgICAgICB0aGlzLnRpbWVyVmlldy50ZXh0Q29udGVudCA9IHRoaXMudGltZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgcmFuZG9tQmV0d2VlbiB9IGZyb20gXCIuLi9oZWxwZXJzL21hdGguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2l0eVxue1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gMTA7XG4gICAgICAgIHRoaXMub2NjdXBpZWRCbG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5lbXB0eUJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrVHlwZXMgPSBbXG5cdFx0XHQnaG91c2UnLFxuXHRcdFx0J3JvYWQnLFxuXHRcdFx0J3dvb2QnXG5cdFx0XTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzLnB1c2goe1xuICAgICAgICAgICAgeDogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aC8yKSxcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IodGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0LzIpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVJhbmRvbUJsb2NrKClcbiAgICB7XG4gICAgICAgIHZhciByYW5kb20gPSByYW5kb21CZXR3ZWVuKDAsIHRoaXMuYmxvY2tUeXBlcy5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2tUeXBlID0gdGhpcy5ibG9ja1R5cGVzW3JhbmRvbV07XG5cbiAgICAgICAgdmFyIGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gYmxvY2tUeXBlO1xuICAgICAgICBibG9jay5jbGFzc05hbWUgPSAnYmxvY2sgJyArIGJsb2NrVHlwZTtcbiAgICAgICAgYmxvY2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLnBsYWNlQmxvY2soYmxvY2spO1xuICAgIH1cblxuICAgIHBsYWNlQmxvY2soYmxvY2spIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuZ2V0RW1wdHlTcGFjZSgpO1xuICAgICAgICBpZiAoY29vcmRzKSB7XG4gICAgICAgICAgICBibG9jay5zdHlsZS5sZWZ0ID0gY29vcmRzLnggKyAncHgnO1xuICAgICAgICAgICAgYmxvY2suc3R5bGUudG9wID0gY29vcmRzLnkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQmxvY2tUb09jY3VwaWVkKGNvb3Jkcyk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlT3V0U3Vycm91bmRpbmdCbG9ja3MoY29vcmRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEVtcHR5U3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5QmxvY2tzW3JhbmRvbUJldHdlZW4oMCwgKHRoaXMuZW1wdHlCbG9ja3MubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBzY29wZU91dFN1cnJvdW5kaW5nQmxvY2tzKGJsb2NrKVxuICAgIHtcbiAgICAgICAgdmFyIG5ld0Jsb2NrcyA9IFtcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCAtIHRoaXMuYmxvY2tTaXplLCB5OiBibG9jay55IH0sXG4gICAgICAgICAgICB7IHg6IGJsb2NrLnggKyB0aGlzLmJsb2NrU2l6ZSwgeTogYmxvY2sueSB9LFxuICAgICAgICAgICAgeyB4OiBibG9jay54LCB5OiBibG9jay55IC0gdGhpcy5ibG9ja1NpemUgfSxcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCwgeTogYmxvY2sueSArIHRoaXMuYmxvY2tTaXplIH1cbiAgICAgICAgXTtcbiAgICAgICAgbmV3QmxvY2tzID0gbmV3QmxvY2tzLmZpbHRlcigoYmxvY2spID0+IHtcbiAgICAgICAgICAgIHZhciBpbkJsb2NrcyA9IHRoaXMub2NjdXBpZWRCbG9ja3MuZmlsdGVyKChvY2N1cGllZEJsb2NrKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9jY3VwaWVkQmxvY2sueCA9PSBibG9jay54ICYmIG9jY3VwaWVkQmxvY2sueSA9PSBibG9jay55O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaW5FbXB0eUJsb2NrcyA9IHRoaXMuZW1wdHlCbG9ja3MuZmlsdGVyKChlbXB0eUJsb2NrKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5QmxvY2sueCA9PSBibG9jay54ICYmIGVtcHR5QmxvY2sueSA9PSBibG9jay55O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaW5CbG9ja3MubGVuZ3RoICsgaW5FbXB0eUJsb2Nrcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW1wdHlCbG9ja3MgPSB0aGlzLmVtcHR5QmxvY2tzLmNvbmNhdChuZXdCbG9ja3MpO1xuICAgIH1cblxuICAgIG1vdmVCbG9ja1RvT2NjdXBpZWQoYmxvY2spXG4gICAge1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzID0gdGhpcy5lbXB0eUJsb2Nrcy5maWx0ZXIoKGVtcHR5QmxvY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eUJsb2NrLnggIT0gYmxvY2sueCB8fCBlbXB0eUJsb2NrLnkgIT0gYmxvY2sueTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub2NjdXBpZWRCbG9ja3MucHVzaChibG9jayk7XG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiByYW5kb21CZXR3ZWVuKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGVuZCAtIHN0YXJ0KSkgKyBzdGFydDtcbn1cbiJdfQ==
