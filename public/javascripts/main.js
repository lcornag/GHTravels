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

function goDestino(name){
    location.href = '/destino/'+ name;
}

function relocateHome(){
    location.href="/";
}

function guardarData(){
    var userName = document.getElementById("saveUsername");
    localStorage.setItem("loginbtn", userName.value);
    relocateHome();
}