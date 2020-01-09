// Debug grid overlay
function dGridShow() {
  $("body").addClass("d_debug-grid-overlay--show");
  $(".d_debug-grid-overlay-toggle").addClass("active");
}

function dGridHide() {
  $("body").removeClass("d_debug-grid-overlay--show");
  $(".d_debug-grid-overlay-toggle").removeClass("active");
}

function dGridToggle() {
  if ($("body").hasClass("d_debug-grid-overlay--show")) {
    dGridHide();
  } else {
    dGridShow();
  }
}

// fire
$(".d_debug-grid-overlay-toggle").on("click", function() {
  dGridToggle();
});
