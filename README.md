# Overlay.js

Basic overlay module, built for easy extension through ES6 modules.

## How to use

### Javascript

```javascript
import Overlay from 'path/to/overlay';

var o = new Overlay(el, options);
o.render('<p>Hi</p>');
o.show();
setTimeout(function() {
  o.hide();
}, 2000);
```

You can import other extensions as well and use them as you wish.

### HTML

The most basic version is below. You can customise anything as long as you either slap the right classes on it or change the selectors in the JS options.

```html
<div class="mod-overlay js-overlay is-hidden">
  <div class="overlay__content js-overlay-content"></div>
</div>
```

### SCSS

There's a tiny bit of CSS that you might want to include so it works smoothly. The main part is the magic with the `transition` on the `z-index`. This allows for smooth CSS transitions, a switch on `display` does not.

```scss
.mod-overlay {
  // your styles here
  
  $transition-duration: 220ms;
  transition: opacity $transition-duration ease-in-out, z-index 16ms linear $transition-duration;
  z-index: -1; // Hide the overlay below everything

  &.is-hidden {
    opacity: 0;
  }

  &.is-shown {
    opacity: 1;
    z-index: 800;
    transition: opacity $transition-duration ease-in-out, z-index 16ms linear;
  }
}
```

## Installation

```
$ bower install overlay-js --save
```
