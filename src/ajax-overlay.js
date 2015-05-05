import Overlay from './overlay';

export default class AjaxOverlay extends Overlay {
  constructor (el, options = { selectors: {}, states: {} }) {
    if (!options.selectors.fetch) {
      options.selectors.fetch = '.js-overlay-fetch';
    }

    super(el, options);
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
      this.show();
    }

    xhr.send();
  }
}
