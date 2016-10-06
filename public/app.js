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
        }, 1000);
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
        this.blockSize = 50;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9nYW1lL0NpdHkuanMiLCJhc3NldHMvanMvaGVscGVycy9tYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQ0ZBOzs7Ozs7OztJQUVxQixxQixHQUdqQixpQ0FDQTtBQUFBOztBQUNJO0FBQ0gsQzs7a0JBTmdCLHFCOzs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7SUFFcUIsYztBQUdqQiw4QkFDQTtBQUFBOztBQUFBOztBQUNJLGFBQUssSUFBTCxHQUFZLG1CQUFTLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFULENBQVo7QUFDQSxhQUFLLElBQUwsR0FBWSxDQUFaOztBQUVBLGFBQUssU0FBTCxHQUFpQixTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBakI7O0FBRUEsYUFBSyxTQUFMO0FBQ0EsZUFBTyxXQUFQLENBQW1CLFlBQU07QUFDckIsa0JBQUssSUFBTDtBQUNBLGdCQUFJLE1BQUssSUFBTCxLQUFjLENBQUMsQ0FBbkIsRUFBc0I7QUFDbEIsc0JBQUssSUFBTCxHQUFZLENBQVo7QUFDQSxzQkFBSyxJQUFMLENBQVUsaUJBQVY7QUFDSDtBQUNELGtCQUFLLFNBQUw7QUFDSCxTQVBELEVBT0csSUFQSDtBQVFIOzs7O29DQUdEO0FBQ0ksaUJBQUssU0FBTCxDQUFlLFdBQWYsR0FBNkIsS0FBSyxJQUFsQztBQUNIOzs7Ozs7a0JBeEJnQixjOzs7Ozs7Ozs7OztBQ0ZyQjs7OztJQUVxQixJO0FBR2pCLGtCQUFZLFNBQVosRUFDQTtBQUFBOztBQUNJLGFBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGFBQUssU0FB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LEVBQ3BCO0FBQ0ksaUJBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FBd0IsVUFBQyxVQUFELEVBQWdCO0FBQ3ZELHVCQUFPLFdBQVcsQ0FBWCxJQUFnQixNQUFNLENBQXRCLElBQTJCLFdBQVcsQ0FBWCxJQUFnQixNQUFNLENBQXhEO0FBQ0gsYUFGa0IsQ0FBbkI7QUFHQSxpQkFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO0FBQ0g7Ozs7OztrQkE5RWdCLEk7Ozs7Ozs7O1FDRkwsYSxHQUFBLGE7QUFBVCxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsR0FBOUIsRUFBbUM7QUFDdEMsV0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsTUFBaUIsTUFBTSxLQUF2QixDQUFYLElBQTRDLEtBQW5EO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcGxpY2F0aW9uQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyc7XG5cbm5ldyBBcHBsaWNhdGlvbkNvbnRyb2xsZXIoKTtcbiIsImltcG9ydCBHYW1lQ29udHJvbGxlciBmcm9tICcuL0dhbWVDb250cm9sbGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25Db250cm9sbGVyXG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBuZXcgR2FtZUNvbnRyb2xsZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2l0eSBmcm9tICcuLi9nYW1lL0NpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbGxlclxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jaXR5ID0gbmV3IENpdHkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpKTtcbiAgICAgICAgdGhpcy50aW1lID0gMTtcblxuICAgICAgICB0aGlzLnRpbWVyVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lci12aWV3Jyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZS0tO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY2l0eS5jcmVhdGVSYW5kb21CbG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVIdWQoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSHVkKClcbiAgICB7XG4gICAgICAgIHRoaXMudGltZXJWaWV3LnRleHRDb250ZW50ID0gdGhpcy50aW1lO1xuICAgIH1cbn0iLCJpbXBvcnQgeyByYW5kb21CZXR3ZWVuIH0gZnJvbSBcIi4uL2hlbHBlcnMvbWF0aC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXR5XG57XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpXG4gICAge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSA1MDtcbiAgICAgICAgdGhpcy5vY2N1cGllZEJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmVtcHR5QmxvY2tzID0gW107XG4gICAgICAgIHRoaXMuYmxvY2tUeXBlcyA9IFtcblx0XHRcdCdob3VzZScsXG5cdFx0XHQncm9hZCcsXG5cdFx0XHQnd29vZCdcblx0XHRdO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMuZW1wdHlCbG9ja3MucHVzaCh7XG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLzIpLFxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQvMilcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmFuZG9tQmxvY2soKVxuICAgIHtcbiAgICAgICAgdmFyIHJhbmRvbSA9IHJhbmRvbUJldHdlZW4oMCwgdGhpcy5ibG9ja1R5cGVzLmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9ja1R5cGUgPSB0aGlzLmJsb2NrVHlwZXNbcmFuZG9tXTtcblxuICAgICAgICB2YXIgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYmxvY2sudGV4dENvbnRlbnQgPSBibG9ja1R5cGU7XG4gICAgICAgIGJsb2NrLmNsYXNzTmFtZSA9ICdibG9jayAnICsgYmxvY2tUeXBlO1xuICAgICAgICBibG9jay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMucGxhY2VCbG9jayhibG9jayk7XG4gICAgfVxuXG4gICAgcGxhY2VCbG9jayhibG9jaykge1xuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5nZXRFbXB0eVNwYWNlKCk7XG4gICAgICAgIGlmIChjb29yZHMpIHtcbiAgICAgICAgICAgIGJsb2NrLnN0eWxlLmxlZnQgPSBjb29yZHMueCArICdweCc7XG4gICAgICAgICAgICBibG9jay5zdHlsZS50b3AgPSBjb29yZHMueSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgICAgICB0aGlzLm1vdmVCbG9ja1RvT2NjdXBpZWQoY29vcmRzKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVPdXRTdXJyb3VuZGluZ0Jsb2Nrcyhjb29yZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RW1wdHlTcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlCbG9ja3NbcmFuZG9tQmV0d2VlbigwLCAodGhpcy5lbXB0eUJsb2Nrcy5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHNjb3BlT3V0U3Vycm91bmRpbmdCbG9ja3MoYmxvY2spXG4gICAge1xuICAgICAgICB2YXIgbmV3QmxvY2tzID0gW1xuICAgICAgICAgICAgeyB4OiBibG9jay54IC0gdGhpcy5ibG9ja1NpemUsIHk6IGJsb2NrLnkgfSxcbiAgICAgICAgICAgIHsgeDogYmxvY2sueCArIHRoaXMuYmxvY2tTaXplLCB5OiBibG9jay55IH0sXG4gICAgICAgICAgICB7IHg6IGJsb2NrLngsIHk6IGJsb2NrLnkgLSB0aGlzLmJsb2NrU2l6ZSB9LFxuICAgICAgICAgICAgeyB4OiBibG9jay54LCB5OiBibG9jay55ICsgdGhpcy5ibG9ja1NpemUgfVxuICAgICAgICBdO1xuICAgICAgICBuZXdCbG9ja3MgPSBuZXdCbG9ja3MuZmlsdGVyKChibG9jaykgPT4ge1xuICAgICAgICAgICAgdmFyIGluQmxvY2tzID0gdGhpcy5vY2N1cGllZEJsb2Nrcy5maWx0ZXIoKG9jY3VwaWVkQmxvY2spID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2NjdXBpZWRCbG9jay54ID09IGJsb2NrLnggJiYgb2NjdXBpZWRCbG9jay55ID09IGJsb2NrLnk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpbkVtcHR5QmxvY2tzID0gdGhpcy5lbXB0eUJsb2Nrcy5maWx0ZXIoKGVtcHR5QmxvY2spID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlCbG9jay54ID09IGJsb2NrLnggJiYgZW1wdHlCbG9jay55ID09IGJsb2NrLnk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpbkJsb2Nrcy5sZW5ndGggKyBpbkVtcHR5QmxvY2tzLmxlbmd0aCA9PSAwO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lbXB0eUJsb2NrcyA9IHRoaXMuZW1wdHlCbG9ja3MuY29uY2F0KG5ld0Jsb2Nrcyk7XG4gICAgfVxuXG4gICAgbW92ZUJsb2NrVG9PY2N1cGllZChibG9jaylcbiAgICB7XG4gICAgICAgIHRoaXMuZW1wdHlCbG9ja3MgPSB0aGlzLmVtcHR5QmxvY2tzLmZpbHRlcigoZW1wdHlCbG9jaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5QmxvY2sueCAhPSBibG9jay54IHx8IGVtcHR5QmxvY2sueSAhPSBibG9jay55O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vY2N1cGllZEJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUJldHdlZW4oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoZW5kIC0gc3RhcnQpKSArIHN0YXJ0O1xufVxuIl19
