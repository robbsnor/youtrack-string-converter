console.log('Dough')



// Debug pannel
function dPannelOpen() {
  $('body').addClass('d_debug-pannel--open')
  $('.d_debug-pannel').css({
    'left': 0
  })
}

function dPannelClose() {
  $('body').removeClass('d_debug-pannel--open')
  var OffsetLeft = $('.d_debug-pannel').width() - $('.d_debug-pannel-toggle').outerWidth();
  $('.d_debug-pannel').css({
    'left': -OffsetLeft
  })
}

function dPannlToggle() {
  if ($('body').hasClass('d_debug-pannel--open')) {
    dPannelClose();
  } else {
    dPannelOpen();
  }
}


// fire
$('.d_debug-pannel-toggle').on('click', function () {
  dPannlToggle();
})



// Debug grid overlay
function dGridShow() {
  $('body').addClass('d_debug-grid-overlay--show')
  $('.d_debug-grid-overlay-toggle').addClass('active')
}

function dGridHide() {
  $('body').removeClass('d_debug-grid-overlay--show')
  $('.d_debug-grid-overlay-toggle').removeClass('active')
}

function dGridToggle() {
  if ($('body').hasClass('d_debug-grid-overlay--show')) {
    dGridHide();
  } else {
    dGridShow();
  }
}


// fire
$('.d_debug-grid-overlay-toggle').on('click', function () {
  dGridToggle();
})


// launch settings
dPannelOpen();
// dGridShow();






$(window).scroll(function () {
  var wScroll = Math.round($(this).scrollTop());
  $('.d_window-scroll-y .d_content').html(wScroll)
});
















$(window).resize(function () {
  var x = window.innerWidth;
  var y = window.innerHeight;

  $('.d_window-size-x .d_content').html(x)
  $('.d_window-size-y .d_content').html(y)
});