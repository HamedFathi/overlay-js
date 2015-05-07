# Changelog

## 1.0.5

- When providing a `<link rel="up" href="/foo/bar">` tag in the `<head>`, the overlay will fetch that page's contents and append it to the body

## 1.0.4

- `overlay:show` and `overlay:hide` event

## 1.0.3

- History routing with changing document title if included in the AJAX response

## 1.0.2
## 1.0.1

- HTML5 History routing

## 1.0.0

- **Complete rewrite** using ES6 modules and a new approach

---

## 0.2.3

- Fix hide_callback, clear_content was executed too early


## 0.2.2

- Fix content_key reset in the hide function (was executed too early)


## 0.2.1

- Fix hide_callback on browsers without transition support


## 0.2.0

- Removed the use of transitionend and used setTimeout instead.
- Added a setting to adjust the setTimeout duration
- Improved the content_key usage
- Added a setting to set the default content key
- Added a pre-hide callback


## 0.1.5

- Show callback isn't always triggered, transitionend listener is troublesome. Hotfixed by setting timeout to 200ms
- Added background close by default


## 0.1.4

- README fix


## 0.1.3

- Better explanation of how to use the plugin
- Show callback event is now `overlay.show.CONTENT_KEY` instead of `overlay.open.CONTENT_KEY`
- Hide callback event now also works with the content key (i.e. the same as the show callback)


## 0.1.2

- Also remove the background element when the
  destroy function is executed


## 0.1.1

- Also render templates for predefined elements
  -> And add option to disable that


## 0.1.0

`INITIAL_VERSION`
