$('a[href*=\\#]').on('click', function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top},500);
});

//header opacity
$(window).scroll(function() {
    divTransparency();
});
function divTransparency() {
    var scrollTop = $(this).scrollTop();
    var tValue = (scrollTop * 3) / 200;
    $('.navbar').css("background-color", "rgba(52,58,64," + tValue + ")")
}

function goDestino(ciudad){
    location.href = '/destino/'+ ciudad;

}

function relocateHome(){
    location.href="/";
}
$(window).scroll(function(){
    parallax();
});
function parallax(){
    var verticalScroll = $(window).scrollTop();
    $('.parallax--bg').css('background-position',
        'center '+(verticalScroll*0.5)+'px')
}
