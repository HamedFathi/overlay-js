(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _Overlay = require('../overlay-es6');

var _Overlay2 = _interopRequireDefault(_Overlay);

var overlay = new _Overlay2['default']();

document.querySelector('.trigger').addEventListener('click', function () {
  overlay.open();
});

//$(function() {
//  var sampleContent = $("script.sample-content").html(),
//      overlay = new Overlay();
//
//  // trigger
//  $(".trigger").on("click", function(e) {
//    overlay.append_content(sample_content);
//    overlay.show("example-content-key");
//  });
//
//  // events
//  $(window).on("overlay.show.default", function(e) {
//    console.log("Overlay is shown");
//  });
//
//  $(window).on("overlay.hide.default", function(e) {
//    console.log("Overlay is hidden");
//  });
//});

},{"../overlay-es6":2}],2:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var Overlay = (function () {
  function Overlay() {
    _classCallCheck(this, Overlay);

    this.overlayEl = null;
    this.template = defaultTemplate();
    this.transitionDuration = 750;

    this.append().bind().init();
  }

  _createClass(Overlay, [{
    key: 'append',

    /**
     * Append element if not already in DOM
     *
     * @return {Overlay}
     */
    value: function append() {
      var overlayEl = document.querySelector('.mod-overlay');

      // Overlay
      if (!overlayEl) {
        overlayEl = document.createElement('div');
        overlayEl.className = 'mod-overlay';
        overlayEl.innerHTML = this.template;

        document.body.appendChild(overlayEl);
      }

      this.overlayEl = overlayEl;

      return this;
    }
  }, {
    key: 'bind',

    /**
     * Bind events
     *
     * @return {Overlay}
     */
    value: function bind() {
      var _this = this;

      document.body.addEventListener('click', function (e) {
        _this.onClickClose(e);
      });

      return this;
    }
  }, {
    key: 'close',

    /**
     * Close overlay by adding CSS classes
     */
    value: function close() {
      var _this2 = this;

      this.overlayEl.classList.remove('is-open');

      setTimeout(function () {
        _this2.overlayEl.style.display = 'none';
      }, this.transitionDuration);
    }
  }, {
    key: 'init',

    /**
     * Initialize overlay instance
     *
     * @return {Overlay}
     */
    value: function init() {
      return this;
    }
  }, {
    key: 'onClickClose',

    /**
     * On click close handler
     *
     * @param  {Event} e
     */
    value: function onClickClose(e) {
      console.log(this);
      if (e.target && e.target.classList.contains('js-overlay-close')) {
        this.close();
      }
    }
  }, {
    key: 'open',

    /**
     * Open overlay by adding CSS classes
     */
    value: function open() {
      var _this3 = this;

      this.overlayEl.style.display = 'block';

      setTimeout(function () {
        _this3.overlayEl.classList.add('is-open');
      }, 25);
    }
  }]);

  return Overlay;
})();

/**
 * Default template HTML
 *
 * @return {String}
 */
function defaultTemplate() {
  return '<div class="overlay__outer-wrapper">\n            <div class="overlay__inner-wrapper">\n              <div class="overlay__background js-overlay-close"></div>\n              <div class="overlay__content">\n                <a href="#" class="js-overlay-close">x</a>\n\n                Hello world\n              </div>\n            </div>\n          </div>';
}

exports['default'] = Overlay;
module.exports = exports['default'];

},{}]},{},[1])


//# sourceMappingURL=build.js.map