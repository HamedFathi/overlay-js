# Overlay.js

Basic overlay module, built for easy extension through ES6 modules.

## How to use

```javascript
var o = new Overlay(el, settings);
o.render('<p>Hi</p>');
o.show();
setTimeout(function() {
  o.hide();
}, 2000);
```

## Install

```
bower install overlay-js
```
