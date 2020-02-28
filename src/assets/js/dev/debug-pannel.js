$(document).ready(function () {

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
  $(window).scroll(function () {
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
  if (window.innerWidth < 500) {
    dPannelClose();
  }


});



// load frontend html
$('body').append(`
  <div class="d_debug-pannel">
    <div class="item d_bootstrap-bp">
        <div class="d_icon"></div>
        <div class="d_content"></div>
    </div>
    <div class="item d_window-size-x">
        <div class="d_icon"></div>
        <div class="d_content"></div>
    </div>
    <div class="item d_window-size-y">
        <div class="d_icon"></div>
        <div class="d_content"></div>
    </div>
    <div class="item d_window-scroll-y">
        <div class="d_icon"></div>
        <div class="d_content">-</div>
    </div>
    <div class="item d_debug-grid-overlay-toggle c-p">
        <div class="d_icon m-0"><i class="material-icons-round">view_week</i></div>
    </div>
    <div class="item d_debug-pannel-toggle c-p">
        <div class="d_icon m-0"><i class="material-icons-round">chevron_right</i></div>
    </div>
    </div>

    <div class="d_debug-grid-overlay">
    <div class="container">
        <div class="row">
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
            <div class="col"><div class="the-col"></div></div>
        </div>
    </div>
  </div>
`)