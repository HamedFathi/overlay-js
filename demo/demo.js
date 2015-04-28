import Overlay from '../overlay-es6';

let overlay = new Overlay();

document.querySelector('.trigger').addEventListener('click', () => {
  overlay.open();
});

//$(function() {
//  var sampleContent = $("script.sample-content").html(),
//      overlay = new Overlay();
//
//  // trigger
//  $(".trigger").on("click", function(e) {
//    overlay.append_content(sample_content);
//    overlay.show("example-content-key");
//  });
//
//  // events
//  $(window).on("overlay.show.default", function(e) {
//    console.log("Overlay is shown");
//  });
//
//  $(window).on("overlay.hide.default", function(e) {
//    console.log("Overlay is hidden");
//  });
//});
