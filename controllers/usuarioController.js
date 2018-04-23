const usuarioModelo = require('../models/usuarioModelo');
let bcrypt = require('bcrypt-nodejs');
const Hbs = require('nodemailer-express-handlebars');
const email = require('../config/mailconf');
const path = require('path');
let passport = require('passport');
let usuarioController = {};

usuarioController.nuevoUsuario = function(req,res,next){
    let nuevoUsuario = req.body;
    nuevoUsuario.hash = bcrypt.hashSync(nuevoUsuario.pass);

    usuarioModelo.findOrCreate({
        where:{
            email: nuevoUsuario.email
        },
        defaults:{
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
            password: nuevoUsuario.password,
            hash: nuevoUsuario.hash,
            admin: 0,
            active: 0
        }
    }).spread((user, created)=>{
        console.log(user.get({
            plain:true
        }));
        console.log(created);
        if(created){
            email.transporter.use('compile', Hbs({
                viewEngine: 'hbs',
                extName: '.hbs',
                viewPath: path.join(__dirname + '/../views/emailTemplates')
            }));
            let encodedhash= encodeURIComponent(nuevoUsuario.hash);
            let message = {
                to: user.email,
                subject: 'GeeksHubs Travels-Activa tu cuenta!',
                template: 'emailActivate',
                context:{
                    encodedhash: encodedhash
                }
            };
            email.transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log("error: "+ error);
                    console.log("info: "+info);
                }
                email.transporter.close();
            });
        }
        res.render('login',{
            title:"Bienveido a GeekshubsTravels!"
        });
    })
};
usuarioController.login = function(req,res,next){
    usuarioModelo.findOne({
        where:{
            username: req.body.username,
            password: req.body.password
        }
    }).then(user=>{
        if(user){
            res.locals.user = user;
            req.session.username = user.username;
            req.session.isAdmin = user.admin;
        }
    })
};

usuarioController.activarUsuario = function(req,res,next){
    let decryptedHash = decodeURIComponent(req.params.id);
    //console.log("DECODED HASH: " + decryptedHash);
    usuarioModelo.findOne({
        where: {
            hash: decryptedHash
        }
    }).then(user=>{
        user.updateAttributes({active: 1})
    });
    res.render('login',{
        title: "Bienveido a Geekshubs Travels!"
    })
};

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
        done(null, user_id);
});

module.exports = usuarioController;