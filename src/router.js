export default class Router {
  constructor (handlers) {
    this.isSupported = (!!history && !!history.pushState);
    this.root = {};

    this.handlers = {
      pop: handlers.pop || (function () {})
    };

    this.init().bind();
  }

  init () {
    this.root = {
      url: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      title: document.title
    };

    this.replace(this.root.url, { title: this.root.title });
    return this;
  }

  bind () {
    window.addEventListener('popstate', e => {
      console.log('ja dus');
      this.handlers.pop(e.state);
    });

    return this;
  }

  push (url, state = {}) {
    if (this.isSupported) {
      state.url = url;
      state.title = state.title || '';

      if (state.title.length > 0) {
        document.title = state.title;
      }

      window.history.pushState(state, state.title, url);
    }
  }

  replace (url, state = {}) {
    if (this.isSupported) {
      state.url = url;
      state.title = state.title || '';

      if (state.title.length > 0) {
        document.title = state.title;
      }

      window.history.replaceState(state, state.title, url);
    }
  }

  pushRoot () {
    this.push(this.root.url, { url: this.root.url, title: this.root.title });
  }

  setRoot (url, title = '') {
    this.root.url = url;
    this.root.title = title;
  }
}