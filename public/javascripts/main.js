$('a[href*=\\#]').on('click', function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top},500);
});

//boton scroll to top
$("#btnToTop div").on("click", function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
});

//scroll event
$(window).on("scroll",function(){
    if($(window).scrollTop() > 200){
        $("#btnToTop div").css("visibility", "visible");
    }else{
        $("#btnToTop div").css("visibility", "hidden");
    }
});

//header opacity
$(window).scroll(function() {
    divTransparency();
});
function divTransparency() {
    var scrollTop = $(this).scrollTop();
    var tValue = (scrollTop * 3) / 1000;
    $('.navbar').css("background-color", "rgba(52,58,64," + tValue + ")")
}

function goDestino(name){
    location.href = '/destino/'+ name;
}
function regLog(reglog){
    location.href = '/' + reglog;
}