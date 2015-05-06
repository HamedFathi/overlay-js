export default class Router {
  constructor (handlers) {
    this.isSupported = (!!history && !!history.pushState);
    this.root = '';

    this.handlers = {
      pop: handlers.pop || (function () {})
    };

    this.init().bind();
  }

  init () {
    this.root = window.location.pathname;
    this.replace(this.root, { title: document.title });
    return this;
  }

  bind () {
    window.addEventListener('popstate', e => {
      this.handlers.pop(e.state);
    });

    return this;
  }

  push (url, state = {}) {
    if (this.isSupported) {
      state.url = url;
      state.title = state.title || '';
      window.history.pushState(state, state.title, url);
    }
  }

  replace (url, state = {}) {
    if (this.isSupported) {
      state.url = url;
      state.title = state.title || '';
      window.history.replaceState(state, state.title, url);
    }
  }

  pushRoot () {
    this.push(this.root);
  }

  pop () {

  }
}