# Overlay.js

Basic overlay module written for easy customization.

## Dependencies

- jQuery or Zepto

## How to use

```javascript
var instance = new Overlay(el, settings);
// both params are optional.
// if no element given, it makes a new one
// and appends it to the body element.

instance.show();
```

```html
<link rel="stylesheet" href="overlay.css" />
```

## Settings

```javascript
// with defaults
class_name = "mod-overlay";
background_class_name = "mod-overlay-background";
content_class_name = "overlay-content";

is_shown_class = "visible";

// functions that return html
template_function = default_template_function;
background_template_function = default_background_template_function;
```

## Install

```
bower install overlay-js
```
