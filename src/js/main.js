console.log('Dough')

var w = window.innerWidth;
var h = window.innerHeight;

function toggleClass(className) {
}

$('.d_toggle').on('click', function () {

  var body = $('body');

  if (body.hasClass('d_debug--open')) {
    body.removeClass('d_debug--open')
    var minOffsetLeft = $('.d_debug').width() - $('.d_toggle').outerWidth();
    $('.d_debug').css({'left': -minOffsetLeft})
  } else {
    body.addClass('d_debug--open')
    $('.d_debug').css({'left': 0})
  }
})

$(function () {
  $('.d_debug [data-toggle="tooltip"]').tooltip({
    delay: {
      show: 300,
      hide: 0
    }
  })
})
