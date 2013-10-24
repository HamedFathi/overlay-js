$(function() {
  var sample_content = $("script.sample-content").html();
  var overlay = new Overlay();

  // trigger
  $(".trigger").on("click", function(e) {
    overlay.append_content(sample_content);
    overlay.show();
  });
});
