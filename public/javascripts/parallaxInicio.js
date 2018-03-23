$(window).scroll(function(){
    parallax();
});
function parallax(){
    var verticalScroll = $(window).scrollTop();
    $('.parallax--bg').css('background-position',
        'center '+(verticalScroll*0.5)+'px')
}
