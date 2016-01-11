(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcAjaxOverlay = require('../src/ajax-overlay');

var _srcAjaxOverlay2 = _interopRequireDefault(_srcAjaxOverlay);

var overlay = new _srcAjaxOverlay2['default']();

document.body.addEventListener('overlay:show', function (e) {
  console.log('Overlay shown');
});

document.body.addEventListener('overlay:hide', function (e) {
  console.log('Overlay hidden');
});

if (!!document.querySelector('.js-overlay-toggle')) {
  document.querySelector('.js-overlay-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    overlay.render('\n      <h2>This is a HTML string rendered inside the overlay</h2>\n      <p>It\'s not neccessary to render from JS, you can also just render static content and use the overlay module as a show / hide toggle.</p>\n      <p>Or you could use a template rendering engine like <a href="http://handlebarsjs.com/">Handlebars</a></p>\n    ');
  });
}

},{"../src/ajax-overlay":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var AjaxOverlay = (function (_Overlay) {
  _inherits(AjaxOverlay, _Overlay);

  function AjaxOverlay(el) {
    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? { selectors: {}, states: {} } : arguments[1];

    _classCallCheck(this, AjaxOverlay);

    if (!options.selectors.fetch) {
      options.selectors.fetch = '.js-overlay-fetch';
    }

    _get(Object.getPrototypeOf(AjaxOverlay.prototype), 'constructor', this).call(this, el, options);

    this.router = new _router2['default']({
      pop: function pop(state) {
        _this.handleRoutePop(state);
      }
    });
  }

  _createClass(AjaxOverlay, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      _get(Object.getPrototypeOf(AjaxOverlay.prototype), 'init', this).call(this);

      if (!!document.querySelector('link[rel="up"]')) {
        (function () {
          var replace = document.querySelector('link[rel="up"]'),
              root = replace.getAttribute('href'),
              xhr = new XMLHttpRequest();

          xhr.open('GET', root, true);

          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

          xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4 || xhr.status !== 200) {
              return false;
            }

            // If the <title> tag is present in the responseText
            // use that as the title in the browser / history
            var title = /<title>(.*)<\/title>/gi.exec(xhr.responseText),
                body = document.createElement('div'),
                parentEl = body.querySelector('.' + replace.parentNode.className.split(' ').join('.'));

            if (!!title && title.length >= 2) {
              title = title[1];
            } else {
              title = document.title;
            }

            _this2.router.setRoot(root, title);

            body.innerHTML = xhr.responseText;

            if (parentEl) {
              body.innerHTML = body.querySelector('.' + replace.parentNode.className.split(' ').join('.')).innerHTML;
            }

            replace.parentNode.replaceChild(body, replace);
          };

          xhr.send();
        })();
      }

      return this;
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this3 = this;

      _get(Object.getPrototypeOf(AjaxOverlay.prototype), 'bind', this).call(this);

      this.bindDelegate('click', this.options.selectors.fetch, function (e, matchingElement) {
        e.preventDefault();
        e.stopPropagation();

        var href = matchingElement.getAttribute('href');

        // Automatically load href attribute if it's on the trigger element
        if (!!href && href.length > 1) {
          _this3.fetch(href);
        }
      });

      return this;
    }

    // Fetch HTML from an URL and render it inside the overlay
    // @param {String}  url   Not supporting CORS properly, so try using relative paths altogether
  }, {
    key: 'fetch',
    value: function fetch(url) {
      var _this4 = this;

      var xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          return false;
        }

        // If the <title> tag is present in the responseText
        // use that as the title in the browser / history
        var title = /<title>(.*)<\/title>/gi.exec(xhr.responseText);

        if (!!title && title.length >= 2) {
          title = title[1];
        } else {
          title = document.title;
        }

        // Expects HTML as responseText
        _this4.render(xhr.responseText);
        _this4.show(url, title);
      };

      xhr.send();
    }

    // Show overlay
    // @param {String}  url     URL to keep in the browser history
    // @param {String}  title   Title to associate with the URL in the browser history
    // @param {Bool}    push    Push to browser history?
  }, {
    key: 'show',
    value: function show() {
      var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
      var push = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      if (_get(Object.getPrototypeOf(AjaxOverlay.prototype), 'show', this).call(this) && !!push) {
        this.router.push(url, { title: title, shown: true });
      }
    }

    // Hide overlay
    // @param {Bool}    push    Push to browser history?
  }, {
    key: 'hide',
    value: function hide() {
      var push = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (_get(Object.getPrototypeOf(AjaxOverlay.prototype), 'hide', this).call(this) && !!push) {
        this.router.pushRoot();
      }
    }

    // Handle browser popstate event
    // @param {Object} state  The state object associated with the popstate event
  }, {
    key: 'handleRoutePop',
    value: function handleRoutePop(state) {
      if (!!state) {
        if (!!state.title && state.title.length > 0) {
          document.title = state.title;
        }

        if (!!state && !!state.shown) {
          this.show(state.url, state.title, false);
        } else {
          this.hide(false);
        }
      }
    }
  }]);

  return AjaxOverlay;
})(_overlay2['default']);

exports['default'] = AjaxOverlay;
module.exports = exports['default'];

},{"./overlay":3,"./router":4}],3:[function(require,module,exports){
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
    var el = arguments.length <= 0 || arguments[0] === undefined ? document.getElementsByClassName('js-overlay')[0] : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? { selectors: {}, states: {} } : arguments[1];

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

  // Initial setup

  _createClass(Overlay, [{
    key: 'init',
    value: function init() {
      return this;
    }

    // Bind event handlers to certain DOM elements, specified through
  }, {
    key: 'bind',
    value: function bind() {
      var _this = this;

      document.body.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          _this.hide();
        }
      });

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

    // Helper method to support clicks on elements that don't exist yet
    // @param {String}    evt       Event to listen for
    // @param {String}    selector  Element selector that triggers the event
    // @param {Function}  handler   Callback method
  }, {
    key: 'bindDelegate',
    value: function bindDelegate(evt, selector, handler) {
      var matches = document.body.matches || document.body.webkitMatchesSelector || document.body.msMatchesSelector;

      // Listen to all events of type evt
      document.body.addEventListener(evt, function (e) {
        // If e.target matches the specified selector or is a child element
        if (!!matches.call(e.target, selector + ', ' + selector + ' *')) {
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

    // Show the overlay
  }, {
    key: 'show',
    value: function show() {
      if (this.el.className.indexOf(this.options.states.shown) !== -1) {
        return false;
      }

      var regex = new RegExp("\\s*" + this.options.states.hidden + "\\s*", 'gi'),
          // Template string not working because of reasons
      evt = new CustomEvent('overlay:show', { bubbles: true, cancelable: true }); // @fixme - IE9 support

      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.shown;

      document.body.dispatchEvent(evt);

      if (document.body.classList) {
        document.body.classList.add('overlay-' + this.options.states.shown);
      } else {
        document.body.className += ' ' + 'overlay-' + this.options.states.shown;
      }

      return true;
    }

    // Hide the overlay
  }, {
    key: 'hide',
    value: function hide() {
      if (this.el.className.indexOf(this.options.states.hidden) !== -1) {
        return false;
      }

      var regex = new RegExp("\\s*" + this.options.states.shown + "\\s*", 'gi'),
          // Template string not working because of reasons
      evt = new CustomEvent('overlay:hide', { bubbles: true, cancelable: true }); // @fixme - IE9 support

      this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.hidden;

      document.body.dispatchEvent(evt);

      if (document.body.classList) {
        document.body.classList.remove('overlay-' + this.options.states.shown);
      } else {
        document.body.className = el.className.replace(new RegExp('(^|\\b)' + 'overlay-' + this.options.states.shown.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }

      return true;
    }

    // Toggle the overlay
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.el.className.indexOf(this.options.states.shown) === -1) {
        this.show();
      } else {
        this.hide();
      }
    }

    // Render HTML inside the content selector
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Router = (function () {
  function Router(handlers) {
    _classCallCheck(this, Router);

    this.isSupported = !!history && !!history.pushState;
    this.root = {};

    this.handlers = {
      pop: handlers.pop || function () {}
    };

    this.init().bind();
  }

  _createClass(Router, [{
    key: 'init',
    value: function init() {
      this.root = {
        url: '' + window.location.pathname + window.location.search + window.location.hash,
        title: document.title
      };

      this.replace(this.root.url, { title: this.root.title });
      return this;
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this = this;

      window.addEventListener('popstate', function (e) {
        console.log('ja dus');
        _this.handlers.pop(e.state);
      });

      return this;
    }
  }, {
    key: 'push',
    value: function push(url) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (this.isSupported) {
        state.url = url;
        state.title = state.title || '';

        if (state.title.length > 0) {
          document.title = state.title;
        }

        window.history.pushState(state, state.title, url);
      }
    }
  }, {
    key: 'replace',
    value: function replace(url) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (this.isSupported) {
        state.url = url;
        state.title = state.title || '';

        if (state.title.length > 0) {
          document.title = state.title;
        }

        window.history.replaceState(state, state.title, url);
      }
    }
  }, {
    key: 'pushRoot',
    value: function pushRoot() {
      this.push(this.root.url, { url: this.root.url, title: this.root.title });
    }
  }, {
    key: 'setRoot',
    value: function setRoot(url) {
      var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      this.root.url = url;
      this.root.title = title;
    }
  }]);

  return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];

},{}]},{},[1])


//# sourceMappingURL=build.js.map
