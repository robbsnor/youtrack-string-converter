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
  var minOffsetLeft = $('.d_debug-pannel').width() - $('.d_debug-pannel-toggle').outerWidth();
  $('.d_debug-pannel').css({
    'left': -minOffsetLeft
  })
}

function dPannlToggle() {
  if ($('body').hasClass('d_debug-pannel--open')) {
    dPannelClose();
  } else {
    dPannelOpen();
  }
}

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

$('.d_debug-grid-overlay-toggle').on('click', function () {
  dGridToggle();
})






































$(function () {
  $('.d_debug-pannel [data-toggle="tooltip"]').tooltip({
    delay: {
      show: 700,
      hide: 0
    }
  })
})