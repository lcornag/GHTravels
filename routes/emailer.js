const express = require('express');
const router = express.Router();
const path = require('path');
const Hbs = require('nodemailer-express-handlebars');
const email = require('../config/mailconf');
const usuarios = require('../models/user');
const btoa = require('btoa');

router.get ('/send',(req,res,send)=>{
    email.transporter.use('compile', Hbs  ({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: path.join(__dirname + '/../views/email-templates')
    }));
    let message = {
        to: 'lcornag@gmail.com',
        subject : 'Geekshubs Travels - Activa tu cuenta!',
        template:'email',
    };
    email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error);
            return
        }
        email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
});
router.post('/forgotPassword',(req,res,send)=>{
    usuarios.findByEmail(req.body.email,(error, result)=>{
        if(result){
            email.transporter.use('compile', Hbs  ({
                viewEngine: 'hbs',
                extName: '.hbs',
                viewPath: path.join(__dirname + '/../views/email-templates')
            }));
            let idUser = result[0].id;
            let idString = idUser.toString();
            let hashId = btoa(idString);
            let username = result[0].username;
            let message = {
                to:req.body.email,
                subject:'Cambio de contraseña',
                template: 'emailRecover',
                context: {
                    user:
                    username,
                    userId:
                    hashId,
                },
                attachments: []
            };
            email.transporter.sendMail(message,(error, info)=>{
                if(error){
                    res.status(500).send(error);
                    return
                }
                email.transporter.close();
                res.status(200).send('Respuesta ' + info.response);
            });
        }else {
            return res.status(500).json(error);
        }
    })
});

module.exports = router;
