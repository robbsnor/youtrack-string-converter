$(document).ready(function () {
  if (window.innerWidth < 500) {
    dPannelClose()
  }
  // dPannelOpen()
  // dGridShow();

  window.onkeypress = function (event) {
    if (event.keyCode == 99) {
      dPannelToggle();
    }
    if (event.keyCode == 103) {
      dGridToggle();
    }
  }
})