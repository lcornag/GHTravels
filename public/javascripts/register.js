$().ready(function(){
    $("#signUp").validate({
        rules:{
            username:{
                required:true,
                maxlength:20
            },
            email:{
                required:true,
                email: true
            },
            psw:{
                required:true,
            },
            pswconfirm:{
                required:true,
                equalTo: "#psw"
            }
        },
        messages:{
            username:{
                required:"please enter a username",
                maxlength: "20 chars max"
            },
            email: {
                required: "please enter your email address",
                email: "please enter a valid email adress"
            },
            psw: "please enter a password",
            pswconfirm: {
                required:"please re-type your password",
                equalTo: "Passwords do not match"
            }
        }
    });
});