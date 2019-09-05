$(function(){
    gnbUI();
    $(window).resize(function(){
        if ($(window).width() > 1024) {
            gnbUI();
        }
    });

    $('.bars').on('click',function() {
        $('.main_header nav').toggleClass('on')
        if($('.main_header nav').hasClass('on')) {
            $('.bars i').attr({'class': 'fa fa-times'});
        }
        else{
            $('.bars i').attr({'class': 'fa fa-bars'})
        }

    });
});

function gnbUI(){
    $('.gnb > li > a').on('mouseenter',function(){
        $(this).parent().addClass('on');
    });
    $('.gnb > li').on('focusin', function() {
        $(this).addClass('on');
    }).on('focusout',function() {
        $(this).removeClass('on')
    });
    $('.gnb > li').on('mouseleave',function(){
        $(this).removeClass('on');
    });
}
