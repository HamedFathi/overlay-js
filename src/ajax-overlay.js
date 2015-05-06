import Overlay from './overlay';
import Router from './router';

export default class AjaxOverlay extends Overlay {
  constructor (el, options = { selectors: {}, states: {} }) {
    if (!options.selectors.fetch) {
      options.selectors.fetch = '.js-overlay-fetch';
    }

    super(el, options);

    this.root = window.location.pathname;
    this.router = new Router({
      pop: (state) => { this.handleRoutePop(state) }
    });
  }

  init () {
    super.init();

    return this;
  }

  bind () {
    super.bind();

    this.bindDelegate('click', this.options.selectors.fetch, (e, matchingElement) => {
      e.preventDefault();
      e.stopPropagation();

      let href = matchingElement.getAttribute('href');

      // Automatically load href attribute if it's on the trigger element
      if (!!href && href.length > 1) {
        this.fetch(href);
      }
    });

    return this;
  }

  // Fetch HTML from an URL and render it inside the overlay
  // @param {String}  url   Not supporting CORS properly, so try using relative paths altogether
  fetch (url) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        return false;
      }

      // Expects HTML as responseText
      this.render(xhr.responseText);
      this.show(url);
    }

    xhr.send();
  }

  show (url = '', push = true) {
    if (super.show() && !!push) {
      this.router.push(url, { shown: true });
    }
  }

  hide (push = true) {
    if (super.hide() && !!push) {
      this.router.pushRoot();
    }
  }

  handleRoutePop (state) {
    if (!!state && !!state.shown) {
      this.show(state.url, false);
    } else {
      this.hide(false);
    }
  }
}
