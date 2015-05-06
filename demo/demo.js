import AjaxOverlay from '../src/ajax-overlay';

let overlay = new AjaxOverlay();

document.body.addEventListener('overlay:show', e => {
  console.log('overlay shown');
});

document.body.addEventListener('overlay:hide', e => {
  console.log('overlay hidden');
});

document.querySelector('.js-overlay-toggle').addEventListener('click', e => {
  e.preventDefault();
  overlay.render(`
    <h2>This is a HTML string rendered inside the overlay</h2>
    <p>It's not neccessary to render from JS, you can also just render static content and use the overlay module as a show / hide toggle.</p>
    <p>Or you could use a template rendering engine like <a href="http://handlebarsjs.com/">Handlebars</a></p>
  `);
});
