class Overlay {

  constructor() {
    this.overlayEl    = null;
    this.template     = defaultTemplate();
    this.transitionDuration = 750;

    this.append().bind().init();
  }

  /**
   * Append element if not already in DOM
   *
   * @return {Overlay}
   */
  append() {
    let overlayEl = document.querySelector('.mod-overlay');

    // Overlay
    if ( !overlayEl ) {
      overlayEl           = document.createElement('div');
      overlayEl.className = 'mod-overlay';
      overlayEl.innerHTML = this.template;

      document.body.appendChild( overlayEl );
    }

    this.overlayEl = overlayEl;

    return this;
  }

  /**
   * Bind events
   *
   * @return {Overlay}
   */
  bind() {
    document.body.addEventListener('click', (e) => { this.onClickClose(e) });

    return this;
  }

  /**
   * Close overlay by adding CSS classes
   */
  close() {
    this.overlayEl.classList.remove('is-open');

    setTimeout( () => {
      this.overlayEl.style.display = 'none';

    }, this.transitionDuration);
  }

  /**
   * Initialize overlay instance
   *
   * @return {Overlay}
   */
  init() {
    return this;
  }

  /**
   * On click close handler
   *
   * @param  {Event} e
   */
  onClickClose(e) {
    console.log(this);
    if ( e.target && e.target.classList.contains('js-overlay-close') ) {
      this.close();
    }
  }

  /**
   * Open overlay by adding CSS classes
   */
  open() {
    this.overlayEl.style.display    = 'block';

    setTimeout( () => {
      this.overlayEl.classList.add('is-open');

    }, 25);
  }

}

/**
 * Default template HTML
 *
 * @return {String}
 */
function defaultTemplate() {
  return `<div class="overlay__outer-wrapper">
            <div class="overlay__inner-wrapper">
              <div class="overlay__background js-overlay-close"></div>
              <div class="overlay__content">
                <a href="#" class="js-overlay-close">x</a>

                Hello world
              </div>
            </div>
          </div>`;
}

export default Overlay;
