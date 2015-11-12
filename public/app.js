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
        this.time = 3;

        this.timerView = document.querySelector('#timer-view');

        this.updateHud();
        window.setInterval(function () {
            _this.time--;
            if (_this.time === -1) {
                _this.time = 3;
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
    }

    _createClass(City, [{
        key: 'createRandomBlock',
        value: function createRandomBlock() {
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
    }, {
        key: 'placeBlock',
        value: function placeBlock(block) {
            var coords = this.getEmptySpace();
            block.style.left = coords.x + 'px';
            block.style.top = coords.y + 'px';
            this.container.appendChild(block);
        }
    }, {
        key: 'getEmptySpace',
        value: function getEmptySpace() {
            return {
                x: 50 * this.randomBetween(0, 20),
                y: 50 * this.randomBetween(0, 20)
            };
        }
    }, {
        key: 'randomBetween',
        value: function randomBetween(a, b) {
            return Math.round(Math.random() * (b - a)) + a;
        }
    }]);

    return City;
})();

exports.default = City;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbnRyb2xsZXJzL0FwcGxpY2F0aW9uQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsImFzc2V0cy9qcy9nYW1lL0NpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLHFDQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0FQLHFCQUFxQixHQUd0QyxTQUhpQixxQkFBcUIsR0FJdEM7MEJBSmlCLHFCQUFxQjs7QUFLbEMsa0NBQW9CLENBQUM7Q0FDeEI7O2tCQU5nQixxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBckIsY0FBYztBQUcvQixhQUhpQixjQUFjLEdBSS9COzs7OEJBSmlCLGNBQWM7O0FBSzNCLFlBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQVMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFlBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOztBQUVkLFlBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkQsWUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLGNBQU0sQ0FBQyxXQUFXLENBQUMsWUFBTTtBQUNyQixrQkFBSyxJQUFJLEVBQUUsQ0FBQztBQUNaLGdCQUFJLE1BQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xCLHNCQUFLLElBQUksR0FBRyxDQUFDLENBQUM7QUFDZCxzQkFBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUNqQztBQUNELGtCQUFLLFNBQVMsRUFBRSxDQUFDO1NBQ3BCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDWjs7aUJBbkJnQixjQUFjOztvQ0FzQi9CO0FBQ0ksZ0JBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUM7OztXQXhCZ0IsY0FBYzs7O2tCQUFkLGNBQWM7Ozs7Ozs7Ozs7Ozs7SUNGZCxJQUFJO0FBR3JCLGFBSGlCLElBQUksQ0FHVCxTQUFTLEVBQ3JCOzhCQUppQixJQUFJOztBQUtqQixZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUM5Qjs7aUJBTmdCLElBQUk7OzRDQVNyQjtBQUNJLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0QyxnQkFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLG9CQUFRLE1BQU07QUFDVixxQkFBSyxDQUFDO0FBQ0YsNkJBQVMsR0FBRyxVQUFVLENBQUM7QUFDdkIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLENBQUM7QUFDRiw2QkFBUyxHQUFHLE1BQU0sQ0FBQztBQUNuQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssQ0FBQztBQUNGLDZCQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ25CLDBCQUFNO0FBQUEsYUFDYjtBQUNELGdCQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLGlCQUFLLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM5QixpQkFBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3ZDLGlCQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7OzttQ0FFVSxLQUFLLEVBQUU7QUFDZCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ2xDLGlCQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNuQyxpQkFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDOzs7d0NBRWU7QUFDWixtQkFBTztBQUNILGlCQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNqQyxpQkFBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDcEMsQ0FBQztTQUNMOzs7c0NBRWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsRDs7O1dBOUNnQixJQUFJOzs7a0JBQUosSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXBwbGljYXRpb25Db250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQXBwbGljYXRpb25Db250cm9sbGVyLmpzJztcblxubmV3IEFwcGxpY2F0aW9uQ29udHJvbGxlcigpO1xuIiwiaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gJy4vR2FtZUNvbnRyb2xsZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbkNvbnRyb2xsZXJcbntcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIG5ldyBHYW1lQ29udHJvbGxlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDaXR5IGZyb20gJy4uL2dhbWUvQ2l0eS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sbGVyXG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmNpdHkgPSBuZXcgQ2l0eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuICAgICAgICB0aGlzLnRpbWUgPSAzO1xuXG4gICAgICAgIHRoaXMudGltZXJWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWVyLXZpZXcnKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUh1ZCgpO1xuICAgICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lLS07XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDM7XG4gICAgICAgICAgICAgICAgdGhpcy5jaXR5LmNyZWF0ZVJhbmRvbUJsb2NrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUh1ZCgpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIdWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy50aW1lclZpZXcudGV4dENvbnRlbnQgPSB0aGlzLnRpbWU7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENpdHlcbntcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcbiAgICB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cblxuICAgIGNyZWF0ZVJhbmRvbUJsb2NrKClcbiAgICB7XG4gICAgICAgIHZhciByYW5kb20gPSB0aGlzLnJhbmRvbUJldHdlZW4oMCwgMik7XG4gICAgICAgIHZhciBibG9ja1R5cGUgPSAnJztcbiAgICAgICAgc3dpdGNoIChyYW5kb20pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPSAnYnVpbGRpbmcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJsb2NrVHlwZSA9ICdyb2FkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPSAnd29vZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gYmxvY2tUeXBlO1xuICAgICAgICBibG9jay5jbGFzc05hbWUgPSAnYmxvY2sgJyArIGJsb2NrVHlwZTtcbiAgICAgICAgYmxvY2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLnBsYWNlQmxvY2soYmxvY2spO1xuICAgIH1cblxuICAgIHBsYWNlQmxvY2soYmxvY2spIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuZ2V0RW1wdHlTcGFjZSgpO1xuICAgICAgICBibG9jay5zdHlsZS5sZWZ0ID0gY29vcmRzLnggKyAncHgnO1xuICAgICAgICBibG9jay5zdHlsZS50b3AgPSBjb29yZHMueSArICdweCc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICB9XG5cbiAgICBnZXRFbXB0eVNwYWNlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogNTAgKiB0aGlzLnJhbmRvbUJldHdlZW4oMCwgMjApLFxuICAgICAgICAgICAgeTogNTAgKiB0aGlzLnJhbmRvbUJldHdlZW4oMCwgMjApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmFuZG9tQmV0d2VlbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpKSArIGE7XG4gICAgfVxufSJdfQ==
