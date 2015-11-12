(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {

    var timerView = document.querySelector('#timer-view');
    var time = 3;
    var container = document.querySelector('body');
    timerView.textContent = time;
    window.setInterval(function () {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUNiLENBQUMsWUFBVzs7QUFFUixRQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RELFFBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNiLFFBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsYUFBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDN0IsVUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFXO0FBQzFCLFlBQUksRUFBRSxDQUFDO0FBQ1AsWUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDYixnQkFBSSxHQUFHLENBQUMsQ0FBQztBQUNULGtCQUFNLEVBQUUsQ0FBQztTQUNaO0FBQ0QsaUJBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQ2hDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsYUFBUyxNQUFNLEdBQUc7QUFDZCxZQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFlBQUksU0FBUyxDQUFDO0FBQ2QsZ0JBQVEsTUFBTTtBQUNWLGlCQUFLLENBQUM7QUFDRix5QkFBUyxHQUFHLFVBQVUsQ0FBQztBQUN2QixzQkFBTTtBQUFBLEFBQ1YsaUJBQUssQ0FBQztBQUNGLHlCQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ25CLHNCQUFNO0FBQUEsQUFDVixpQkFBSyxDQUFDO0FBQ0YseUJBQVMsR0FBRyxNQUFNLENBQUM7QUFDbkIsc0JBQU07QUFBQSxTQUNiO0FBQ0QsWUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxhQUFLLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM5QixhQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdkMsYUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ2xDLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckI7O0FBRUQsYUFBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQ3ZCLFlBQUksTUFBTSxHQUFHLGFBQWEsRUFBRSxDQUFDO0FBQzdCLGFBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ25DLGFBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLGlCQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDOztBQUVELGFBQVMsYUFBYSxHQUFHO0FBQ3JCLGVBQU87QUFDSCxhQUFDLEVBQUUsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzVCLGFBQUMsRUFBRSxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDL0IsQ0FBQztLQUNMOztBQUVELGFBQVMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDekIsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsRDtDQUVKLENBQUEsRUFBRyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHRpbWVyVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lci12aWV3Jyk7XG4gICAgdmFyIHRpbWUgPSAzO1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgdGltZXJWaWV3LnRleHRDb250ZW50ID0gdGltZTtcbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWUtLTtcbiAgICAgICAgaWYgKHRpbWUgPT09IC0xKSB7XG4gICAgICAgICAgICB0aW1lID0gMztcbiAgICAgICAgICAgIGNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVyVmlldy50ZXh0Q29udGVudCA9IHRpbWU7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHZhciByYW5kb20gPSByYW5kb21CZXR3ZWVuKDAsIDIpO1xuICAgICAgICB2YXIgY2xhc3NuYW1lO1xuICAgICAgICBzd2l0Y2ggKHJhbmRvbSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNsYXNzbmFtZSA9ICdidWlsZGluZyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgY2xhc3NuYW1lID0gJ3JvYWQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNsYXNzbmFtZSA9ICd3b29kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYmxvY2sudGV4dENvbnRlbnQgPSBjbGFzc25hbWU7XG4gICAgICAgIGJsb2NrLmNsYXNzTmFtZSA9ICdibG9jayAnICsgY2xhc3NuYW1lO1xuICAgICAgICBibG9jay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHBsYWNlQmxvY2soYmxvY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlQmxvY2soYmxvY2spIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IGdldEVtcHR5U3BhY2UoKTtcbiAgICAgICAgYmxvY2suc3R5bGUubGVmdCA9IGNvb3Jkcy54ICsgJ3B4JztcbiAgICAgICAgYmxvY2suc3R5bGUudG9wID0gY29vcmRzLnkgKyAncHgnO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVtcHR5U3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiA1MCAqIHJhbmRvbUJldHdlZW4oMCwgMjApLFxuICAgICAgICAgICAgeTogNTAgKiByYW5kb21CZXR3ZWVuKDAsIDIwKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbUJldHdlZW4oYSwgYikge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGIgLSBhKSkgKyBhO1xuICAgIH1cblxufSkoKTtcbiJdfQ==
