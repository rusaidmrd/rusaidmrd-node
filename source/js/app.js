var icon_btn = $('.icon-btn');
var icon_active_btn = $('.icon-active');

icon_btn.on('click', function () {
    $(this).toggleClass('icon-active');
    $(this).toggleClass('not-active');

    $('.nav-wrap').toggleClass('anim');
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
    var scroll = document.getElementById('scroll-up');
    var y = window.scrollY;
    if (y >= 500) {
        scroll.style.opacity = 1;
    } else {
        scroll.style.opacity = 0;
    }
}

window.addEventListener('scroll', showScrollButton);