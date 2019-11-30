console.log('Dough')

var w = window.innerWidth;
var h = window.innerHeight;

$('.d_toggle').on('click', function () {

  var body = $('body');

  if (body.hasClass('d_debug-pannel--open')) {

    body.removeClass('d_debug-pannel--open')
    var minOffsetLeft = $('.d_debug-pannel').width() - $('.d_toggle').outerWidth();
    $('.d_debug-pannel').css({'left': -minOffsetLeft})

  } else {

    body.addClass('d_debug-pannel--open')
    $('.d_debug-pannel').css({'left': 0})

  }
})

$(function () {
  $('.d_debug-pannel [data-toggle="tooltip"]').tooltip({
    delay: {
      show: 300,
      hide: 0
    }
  })
})


