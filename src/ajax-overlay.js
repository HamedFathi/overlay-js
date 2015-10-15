import Overlay from './overlay';
import Router from './router';

export default class AjaxOverlay extends Overlay {
  constructor (el, options = { selectors: {}, states: {} }) {
    if (!options.selectors.fetch) {
      options.selectors.fetch = '.js-overlay-fetch';
    }

    super(el, options);

    this.router = new Router({
      pop: (state) => { this.handleRoutePop(state) }
    });
  }

  init () {
    super.init();

    if (!!document.querySelector('link[rel="up"]')) {
      let replace = document.querySelector('link[rel="up"]'),
          root = replace.getAttribute('href'),
          xhr = new XMLHttpRequest();

      xhr.open('GET', root, true);

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          return false;
        }

        // If the <title> tag is present in the responseText
        // use that as the title in the browser / history
        let title = /<title>(.*)<\/title>/gi.exec(xhr.responseText),
            body = document.createElement('div'),
            parentEl = body.querySelector(`.${replace.parentNode.className.split(' ').join('.')}`);

        if (!!title && title.length >= 2) {
          title = title[1];
        } else {
          title = document.title;
        }

        this.router.setRoot(root, title);

        body.innerHTML = xhr.responseText;

        if ( parentEl ) {
          body.innerHTML = body.querySelector(`.${replace.parentNode.className.split(' ').join('.')}`).innerHTML;
        }

        replace.parentNode.replaceChild(body, replace);
      }

      xhr.send();
    }

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

      // If the <title> tag is present in the responseText
      // use that as the title in the browser / history
      let title = /<title>(.*)<\/title>/gi.exec(xhr.responseText);

      if (!!title && title.length >= 2) {
        title = title[1];
      } else {
        title = document.title;
      }

      // Expects HTML as responseText
      this.render(xhr.responseText);
      this.show(url, title);
    }

    xhr.send();
  }

  // Show overlay
  // @param {String}  url     URL to keep in the browser history
  // @param {String}  title   Title to associate with the URL in the browser history
  // @param {Bool}    push    Push to browser history?
  show (url = '', title = '', push = true) {
    if (super.show() && !!push) {
      this.router.push(url, { title: title, shown: true });
    }
  }

  // Hide overlay
  // @param {Bool}    push    Push to browser history?
  hide (push = true) {
    if (super.hide() && !!push) {
      this.router.pushRoot();
    }
  }

  // Handle browser popstate event
  // @param {Object} state  The state object associated with the popstate event
  handleRoutePop (state) {
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
}
