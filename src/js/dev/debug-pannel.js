// debug pannel
function dPannelOpen() {
  $("body").addClass("d_debug-pannel--open");
  $(".d_debug-pannel").css({
    left: 0
  });
}

function dPannelClose() {
  $("body").removeClass("d_debug-pannel--open");
  var OffsetLeft =
    $(".d_debug-pannel").width() - $(".d_debug-pannel-toggle").outerWidth();
  $(".d_debug-pannel").css({
    left: -OffsetLeft
  });
}

function dPannelToggle() {
  if ($("body").hasClass("d_debug-pannel--open")) {
    dPannelClose();
  } else {
    dPannelOpen();
  }
}




// width and height indicator
function setWHIndicators() {
  var x = window.innerWidth;
  var y = window.innerHeight;

  $(".d_window-size-x .d_content").html(x);
  $(".d_window-size-y .d_content").html(y);
}



// window scroll top indicator
$(window).scroll(function() {
  var wScroll = Math.round($(this).scrollTop());
  $(".d_window-scroll-y .d_content").html(wScroll);
});




// fire debug pannel
dPannelOpen();
$(".d_debug-pannel-toggle").on("click", function () {
  dPannelToggle();
});

// fire size indicators
setWHIndicators();
$(window).resize(function () {
  setWHIndicators();
});

// close debug pannel on mobile
$(document).ready(function () {
  if (window.innerWidth < 500) {
    dPannelClose();
  }
});