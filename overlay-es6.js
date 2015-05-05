export default class Overlay {

  // @constructor
  // @param {HTMLElement} el
  // @param {Object}      options
  constructor (el = document.getElementsByClassName('js-overlay')[0], options = {}) {
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

  // Initial setup
  init () {
    return this;
  }

  // Bind event handlers to certain DOM elements, specified through
  bind () {
    this.bindDelegate('click', this.options.selectors.show, e => {
      e.preventDefault();
      e.stopPropagation();
      this.show();
    });

    this.bindDelegate('click', this.options.selectors.hide, e => {
      e.preventDefault();
      e.stopPropagation();
      this.hide();
    });

    this.bindDelegate('click', this.options.selectors.toggle, e => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });

    return this;
  }

  // Helper method to support clicks on elements that don't exist yet
  // @param {String}    evt       Event to listen for
  // @param {String}    selector  Element selector that triggers the event
  // @param {Function}  handler   Callback method
  bindDelegate (evt, selector, handler) {
    let matches = document.body.matches || document.body.webkitMatchesSelector || document.body.msMatchesSelector;

    // Listen to all events of type evt
    document.body.addEventListener(evt, e => {
      // If e.target matches the specified selector or is a child element
      if (!!matches.call(e.target, `${selector}, ${selector} *`)) {
        // Execute handler, pass on the Event object
        handler(e);
      }
    }, false);
  }

  // Show the overlay
  show () {
    let regex = new RegExp("\\s*" + this.options.states.hidden + "\\s*", 'gi'); // Template string not working because of reasons
    this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.shown;
  }

  // Hide the overlay
  hide () {
    let regex = new RegExp("\\s*" + this.options.states.shown + "\\s*", 'gi'); // Template string not working because of reasons
    this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.hidden;
  }

  // Toggle the overlay
  toggle () {
    if (this.el.className.indexOf(this.options.states.shown) === -1) {
      this.show();
    } else {
      this.hide();
    }
  }

  // Render HTML inside the content selector
  render (html) {
    this.el.querySelector(this.options.selectors.content).innerHTML = html;
  }
}
