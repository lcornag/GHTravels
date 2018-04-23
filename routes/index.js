const express = require('express');
const router = express.Router();
const usuarios = require('../models/user');
const viajes = require('../models/destiny');
const atob = require('atob');
const createError = require('http-errors');
const usuarioController = require('../controllers/usuarioController');
const viajesController = require('../controllers/ViajesController');
const passport = require('passport');

/* home page. */
router.get('/', (req, res,next)=> {
    viajesController.findActive(req, res, next);
});

router.get('/destino/:ciudad', (req, res, next)=>{
    viajes.findByCity(req.params.ciudad, (error,viajes)=>{
        if(error) return res.status(500).json(error);

        if (req.session.isUserLogged === 1) {
            res.render('destino',{
                title:"GeeksHubs Travels",
                isUserLogged : req.session.isUserLogged,
                user: req.session.username,
                viajes
            })
        }
        else {
            res.redirect('/')
        }
        next(createError(404));
        express.use(function(err, req, res) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    })
});
router.get('/login', (req,res,next)=>{
    res.render('login', {
        title:'Log in'
    })
});
router.get('/register',(req,res,next)=> {
    res.render('register', {
        title: 'Registrate en GH Travels'
    })
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/profile', function(req, res){
    res.render('profile', {title:'Profile'});
});


router.get('/carrito',(req,res,next)=>{
    res.render('carrito', {
        title:'Tu carrito de compra'
    })
});

router.post('/register', function (req, res,next) {
    usuarioController.nuevoUsuario(req, res);
});


router.get('/activate/:id', function(req,res,next){
    usuarioController.activarUsuario(req,res);
});

router.get('/recuperarPassword/:id', (req,res,next)=>{
    let id = atob(req.params.id);
    usuarios.findById(id,(error, result)=>{
        if(result){
            res.render('recuperarPassword', {
                result: result[0]
            });
        }else {
            return res.status(500).json(error);
        }
    });
    next(createError(404));
    express.use(function(err, req, res) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
});
router.post('/recuperarPassword', (req,res,next)=>{
    let user = {};
    user.id = req.body.id;
    user.password = req.body.password;

    usuarios.updatePassword(user, (error, result)=>{
        if(result){
            res.redirect('/passwordCambiado');
        } else {
            res.status(500).json('Error al editar usuario '+ error);
        }
    });
});
router.get('/signout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});
router.get('/newPassword', function(req, res, next) {
    res.render('passwordCambiado',
        { title: 'Cambio de Password' })
});


module.exports = router;