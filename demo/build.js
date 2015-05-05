(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _overlayEs6 = require('../overlay-es6');

var _overlayEs62 = _interopRequireDefault(_overlayEs6);

var overlay = new _overlayEs62['default']();
overlay.render('\n  <h2>This is a HTML string rendered inside the overlay</h2>\n  <p>It\'s not neccessary to render from JS, you can also just render static content and use the overlay module as a show / hide toggle.</p>\n  <p>Or you could use a template rendering engine like <a href="http://handlebarsjs.com/">Handlebars</a></p>\n');

},{"../overlay-es6":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Overlay = (function () {
  function Overlay() {
    var el = arguments[0] === undefined ? document.getElementsByClassName('js-overlay')[0] : arguments[0];
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Overlay);

    this.el = el;

    // @todo - Merge with options
    this.options = {
      selectors: {
        close: '.js-overlay-close',
        content: '.js-overlay-content',
        show: '.js-overlay-show',
        toggle: '.js-overlay-toggle'
      },
      states: {
        hidden: 'is-hidden',
        shown: 'is-shown'
      }
    };

    this.init().bind();
  }

  _createClass(Overlay, [{
    key: 'init',
    value: function init() {
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

      this.bindDelegate('click', this.options.selectors.show, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.show();
      });

      this.bindDelegate('click', this.options.selectors.hide, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.hide();
      });

      this.bindDelegate('click', this.options.selectors.toggle, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.toggle();
      });

      return this;
    }
  }, {
    key: 'bindDelegate',
    value: function bindDelegate(evt, selector, handler) {
      var matches = document.body.matches || document.body.webkitMatchesSelector || document.body.msMatchesSelector;

      document.body.addEventListener(evt, function (e) {
        if (!!matches.call(e.target, '' + selector + ', ' + selector + ' *')) {
          handler(e);
        }
      }, false);
    }
  }, {
    key: 'show',
    value: function show() {
      var regex = new RegExp('\\s*' + this.options.states.hidden + '\\s*', 'gi'); // Template string not working because of reasons
      console.log('[Overlay] Show');
      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.shown;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var regex = new RegExp('\\s*' + this.options.states.shown + '\\s*', 'gi'); // Template string not working because of reasons
      console.log('[Overlay] Hide');
      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.hidden;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.el.className.indexOf(this.options.states.shown) === -1) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'render',
    value: function render(html) {
      this.el.querySelector(this.options.selectors.content).innerHTML = html;
    }
  }]);

  return Overlay;
})();

exports['default'] = Overlay;
module.exports = exports['default'];

},{}]},{},[1])


//# sourceMappingURL=build.js.map