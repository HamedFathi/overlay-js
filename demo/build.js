(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcAjaxOverlay = require('../src/ajax-overlay');

var _srcAjaxOverlay2 = _interopRequireDefault(_srcAjaxOverlay);

var overlay = new _srcAjaxOverlay2['default']();

document.querySelector('.js-overlay-toggle').addEventListener('click', function (e) {
  e.preventDefault();
  overlay.render('\n    <h2>This is a HTML string rendered inside the overlay</h2>\n    <p>It\'s not neccessary to render from JS, you can also just render static content and use the overlay module as a show / hide toggle.</p>\n    <p>Or you could use a template rendering engine like <a href="http://handlebarsjs.com/">Handlebars</a></p>\n  ');
});

},{"../src/ajax-overlay":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var AjaxOverlay = (function (_Overlay) {
  function AjaxOverlay(el) {
    var options = arguments[1] === undefined ? { selectors: {}, states: {} } : arguments[1];

    _classCallCheck(this, AjaxOverlay);

    if (!options.selectors.fetch) {
      options.selectors.fetch = '.js-overlay-fetch';
    }

    _get(Object.getPrototypeOf(AjaxOverlay.prototype), 'constructor', this).call(this, el, options);
  }

  _inherits(AjaxOverlay, _Overlay);

  _createClass(AjaxOverlay, [{
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      _get(Object.getPrototypeOf(AjaxOverlay.prototype), 'bind', this).call(this);

      this.bindDelegate('click', this.options.selectors.fetch, function (e, matchingElement) {
        e.preventDefault();
        e.stopPropagation();

        var href = matchingElement.getAttribute('href');

        // Automatically load href attribute if it's on the trigger element
        if (!!href && href.length > 1) {
          _this2.fetch(href);
        }
      });
    }
  }, {
    key: 'fetch',

    // Fetch HTML from an URL and render it inside the overlay
    // @param {String}  url   Not supporting CORS properly, so try using relative paths altogether
    value: function fetch(url) {
      var _this3 = this;

      var xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          return false;
        }

        // Expects HTML as responseText
        _this3.render(xhr.responseText);
        _this3.show();
      };

      xhr.send();
    }
  }]);

  return AjaxOverlay;
})(_overlay2['default']);

exports['default'] = AjaxOverlay;
module.exports = exports['default'];

},{"./overlay":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Overlay = (function () {

  // @constructor
  // @param {HTMLElement} el
  // @param {Object}      options

  function Overlay() {
    var el = arguments[0] === undefined ? document.getElementsByClassName('js-overlay')[0] : arguments[0];
    var options = arguments[1] === undefined ? { selectors: {}, states: {} } : arguments[1];

    _classCallCheck(this, Overlay);

    this.el = el;

    this.options = {
      selectors: {
        content: '.js-overlay-content',
        hide: '.js-overlay-hide',
        show: '.js-overlay-show',
        toggle: '.js-overlay-toggle'
      },
      states: {
        hidden: 'is-hidden',
        shown: 'is-shown'
      }
    };

    // Merge provided selectors
    for (var selector in options.selectors) {
      if (options.selectors.hasOwnProperty(selector)) {
        this.options.selectors[selector] = options.selectors[selector];
      }
    }

    // Merge provided states
    for (var state in options.states) {
      if (options.states.hasOwnProperty(state)) {
        this.options.states[state] = options.states[state];
      }
    }

    this.init().bind();
  }

  _createClass(Overlay, [{
    key: 'init',

    // Initial setup
    value: function init() {
      return this;
    }
  }, {
    key: 'bind',

    // Bind event handlers to certain DOM elements, specified through
    value: function bind() {
      var _this = this;

      this.bindDelegate('click', this.options.selectors.show, function (e) {
        e.preventDefault();
        _this.show();
      });

      this.bindDelegate('click', this.options.selectors.hide, function (e) {
        e.preventDefault();
        _this.hide();
      });

      this.bindDelegate('click', this.options.selectors.toggle, function (e) {
        e.preventDefault();
        _this.toggle();
      });

      return this;
    }
  }, {
    key: 'bindDelegate',

    // Helper method to support clicks on elements that don't exist yet
    // @param {String}    evt       Event to listen for
    // @param {String}    selector  Element selector that triggers the event
    // @param {Function}  handler   Callback method
    value: function bindDelegate(evt, selector, handler) {
      var matches = document.body.matches || document.body.webkitMatchesSelector || document.body.msMatchesSelector;

      // Listen to all events of type evt
      document.body.addEventListener(evt, function (e) {
        // If e.target matches the specified selector or is a child element
        if (!!matches.call(e.target, '' + selector + ', ' + selector + ' *')) {
          // Find the actual element that matches the selector
          var matchingElement = e.target;
          while (!matches.call(matchingElement, selector)) {
            matchingElement = matchingElement.parentNode;
          }

          // Execute handler, pass on the Event object
          // and have the matching element as the second argument
          handler(e, matchingElement);
        }
      }, false);
    }
  }, {
    key: 'show',

    // Show the overlay
    value: function show() {
      var regex = new RegExp('\\s*' + this.options.states.hidden + '\\s*', 'gi'); // Template string not working because of reasons
      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.shown;
    }
  }, {
    key: 'hide',

    // Hide the overlay
    value: function hide() {
      var regex = new RegExp('\\s*' + this.options.states.shown + '\\s*', 'gi'); // Template string not working because of reasons
      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.hidden;
    }
  }, {
    key: 'toggle',

    // Toggle the overlay
    value: function toggle() {
      if (this.el.className.indexOf(this.options.states.shown) === -1) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'render',

    // Render HTML inside the content selector
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