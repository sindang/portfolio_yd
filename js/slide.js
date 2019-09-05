$(function(){
    applyImageSlide('div.main_img', 1, 'play', 3000);

    function applyImageSlide(selector, first, status, speed) {
        // 상태변수 설정
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
        var numSlide = $(selector).find('ul.slide li').length;
        var onPlaying = 'off';   // on : animation 중, off : animation X
        var timerId = 0;
        var timerSpeed = speed;
        var timerStatus = status;    // on : 켜진상태, off : 꺼진 상태

        // UI 초기화
        $(selector).find('ul.slide li').each(function(i) {
            $(selector).find('ul.indicator').append('<li><a href="#">' + (i + 1) + '번 비주얼</a></li>\n');
        });
        if (timerStatus === 'play') {
            $(selector).find('p.control a.play i').attr({'class': 'fa fa-pause'});
        } else {
            $(selector).find('p.control a.play i').attr({'class': 'fa fa-play'});
        }
        showSlide(first);

        // 이벤트
        $(selector).find('ul.indicator li a').on('click', function() {
            var index = $(selector).find('ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });
        $(selector).find('p.control a.prev').on('click', function() {
            showSlide(slidePrev);
        });
        $(selector).find('p.control a.next').on('click', function() {
            showSlide(slideNext);
        });
        $(selector).find('p.control a.play').on('click', function() {
            if (timerStatus === 'play') {
                clearTimeout(timerId);
                $(this).find('i').attr({'class': 'fa fa-play'});
                timerStatus = 'pause';
            } else {
                timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                $(this).find('i').attr({'class': 'fa fa-pause'});
                timerStatus = 'play';
            }
        });

        // 공통함수 정의
        function showSlide(n) {
            if (slideNow === n || onPlaying === 'on') return false;
            clearTimeout(timerId);
            if (slideNow === 0) {
                $(selector).find('ul.slide li').css({'display': 'none'});
                $(selector).find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
            } else {
                onPlaying = 'on';
                $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').stop().animate({'opacity': 0}, 500, function() {
                    $(this).css({'display': 'none'});
                    onPlaying = 'off';
                });
                $(selector).find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).stop().animate({'opacity': 1}, 500);
            }
            $(selector).find('ul.indicator li').removeClass('on');
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slidePrev = ((n - 1) < 1) ? numSlide : n - 1;
            slideNext = ((n + 1) > numSlide) ? 1 : n + 1;
            //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
            if (timerStatus === 'play') {
                timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            }
        }
    }
});
