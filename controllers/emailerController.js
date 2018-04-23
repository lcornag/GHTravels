const express = require('express');
const router = express.Router();
const path = require('path');
const email = require('../config/mailconf');
const usuarios = require('../models/user');
const btoa = require('btoa');

let emailController = {};

emailController.newUserEmail = (req,res,next)=>{
    email.transporter.use('compile', Hbs ({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: path.join(__dirname + '/../views/email-templates')
    }));
    let message = {
        to: 'lcornag@gmail.com',
        subject: 'GeeksHubs Travels-Activa tu cuenta!',
        template: 'email'
    };
    email.transporter.sendMail(message, (error, info)=>{
        if(error){
            res.status(500).send(error);
        }
        email.transporter.close();
    })
};

module.exports = emailController;