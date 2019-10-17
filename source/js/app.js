var icon_btn = $('.icon-btn');
var icon_active_btn = $('.icon-active');

icon_btn.on('click', function () {
    $(this).toggleClass('icon-active');
    $(this).toggleClass('not-active');
    $('.nav-wrapper').toggleClass('open');
    console.log('sjhbjdjsnjdbcjdbcwjdsbcjbdcsj ' + $('.nav-wrapper').siblings('open').length);
});


$('.nav-menu li a').on('click', function () {
    $('.nav-wrapper').removeClass('open');
    icon_btn.removeClass('icon-active');
    icon_btn.addClass('not-active');
});


// initiate the sal.js
sal({
    threshold: 1,
    once: false,
});


// initiate the SmoothScroll
var scroll = new SmoothScroll('a[href*="#"]');


// detect the scroll
function showScrollButton() {

    $('.alert-wrapper').hide();

    if ($('.nav-wrapper').hasClass('open')) {
        $('.toggle-wrapper .icon-wrap').css({
            'position': 'fixed'
        });
    } else {
        $('.toggle-wrapper .icon-wrap').css({
            'position': 'absolute'
        });
    }


    var scroll = document.getElementById('scroll-up');
    var y = window.scrollY;
    if (y >= 500) {
        scroll.style.opacity = 1;
    } else {
        scroll.style.opacity = 0;
    }
}

window.addEventListener('scroll', showScrollButton);