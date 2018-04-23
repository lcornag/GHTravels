$().ready(function(){
    $("#signUp").validate({
        rules:{
            username:{
                required:true,
                maxlength:15
            },
            email:{
                required:true,
                email: true
            },
            password:{
                required:true,
            },
            passwordconfirm:{
                required:true,
                equalTo: "#password"
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
            password: "please enter a password",
            passwordconfirm: {
                required:"please re-type your password",
                equalTo: "Passwords do not match"
            }
        }
    });
});