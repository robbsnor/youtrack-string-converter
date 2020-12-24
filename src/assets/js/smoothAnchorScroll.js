// add a "-" for every smooth scroll link: index.html#about-

$("a").on("click", function (e) {
    var hash = $(this)[0].hash.slice(0, -1)
    console.log(hash);


    $("html,body").animate({
        scrollTop: $(hash).offset().top,
    });
});

$(document).ready(function () {
    if (window.location.hash) {
        var urlHash = window.location.hash.slice(0, -1);

        if ($(urlHash).length) {
            $('html,body').animate({
                    scrollTop: $(urlHash).offset().top
                },
                'slow'
            );
        }
    }
});