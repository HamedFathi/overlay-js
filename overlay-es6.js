class Overlay {

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

  init () {
    return this;
  }

  /**
   * Bind events
   *
   * @return {Overlay}
   */
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

  bindDelegate (evt, selector, handler) {
    let matches = document.body.matches || document.body.webkitMatchesSelector || document.body.msMatchesSelector;

    document.body.addEventListener(evt, e => {
      if (!!matches.call(e.target, `${selector}, ${selector} *`)) {
        handler(e);
      }
    }, false);
  }

  show () {
    let regex = new RegExp("\\s*" + this.options.states.hidden + "\\s*", 'gi'); // Template string not working because of reasons
    console.log('[Overlay] Show');
    this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.shown;
  }

  hide () {
    let regex = new RegExp("\\s*" + this.options.states.shown + "\\s*", 'gi'); // Template string not working because of reasons
    console.log('[Overlay] Hide');
    this.el.className = this.el.className.replace(regex, '') + ' ' + this.options.states.hidden;
  }

  toggle () {
    if (this.el.className.indexOf(this.options.states.shown) === -1) {
      this.show();
    } else {
      this.hide();
    }
  }

  render (html) {
    this.el.querySelector(this.options.selectors.content).innerHTML = html;
  }
}

export default Overlay;
