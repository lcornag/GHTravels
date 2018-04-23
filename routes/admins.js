const express = require('express');
const router = express.Router();
let user = require('../models/user');
let destinos = require('../models/destiny');
const upload = require('../config/multer');
const createError = require('http-errors');

let usuarioController = require('../controllers/usuarioController');
//ADMIN SESSIONS

//DESTINOS
router.get('/panelDestinos', function(req, res, next) {
    destinos.findAll((error,viajes)=>{
        if(error) return res.status(500).json(error);
        else{
            let admin = req.session.isAdmin;
            if(admin===1){
                res.render('listaDestinos',{
                    layout: 'admin',
                    title:"Panel de Destinos",
                    user : req.session.username,
                    isAdmin : req.session.isAdmin,
                    isUserLogged : req.session.isUserLogged,
                    viajes
                })
            }
            else{
                res.redirect('/')
            }
        }
    });
});

router.get('/crearDestino', (req, res, next)=>{
    res.render('creacionDestino', {
        layout: 'admin',
    });
});

router.post('/guardarDestino', (req, res, next)=>{
    let active;
    if(req.body.active === 'on'){
        active = 1;
    }else{ active = 0 }

    let destino = {};
    destino.ciudad = req.body.ciudad;
    destino.active = active;
    destino.precio = req.body.precio;
    destino.imagen = '/' + req.file.path;

    destinos.insertarDestino(destino, (error, insertID)=>{
        if(insertID){
            res.redirect('/admin/destinos');
        } else {
            res.status(500).json('Error al guardar'+ error);
        }
    });
});

router.post('/editar-destino',upload.single('file'), (req, res, next)=>{
    let active;
    if(req.body.active === 'on'){
        active = 1;
    }else{ active = 0 }

    let destino = {};
    destino.id = req.body.id;
    destino.city = req.body.travel;
    destino.description = req.body.description;
    destino.type = req.body.type;
    destino.active = active;
    destino.price = req.body.price;
    destino.image = "/" + req.file.path;

    destinos.update(destino, (error, result)=>{
        if(result){
            res.redirect('/admin/panelDestinos');
        } else {
            res.status(500).json('Error al editar'+ error);
        }
    });
});

router.get('/eliminarDestino/:id', (req, res, next)=>{
    let id = req.params.id;

    destinos.borrarDestino(id, (error, result)=>{
        if(result){
            res.redirect('/admin/destinos');
        }else{
            res.status(500).json('Error al eliminar destino'+ error);
        }
    })
});

router.get('/editarDestino/:id', (req, res, next)=>{
    let id = req.params.id;
    destinos.findById(id,(error, result)=>{
        if(result){
            res.render('edicionDestino', {
                layout: 'admin',
                result: result[0]
            });
        }else {
            return res.status(500).json(error);
        }
    })
});

 //USUARIOS
//router.get('/panelUsuarios', function(req, res,next ) {
   //usuarioController.nuevoUsuario(req,res,next);

   /* user.findAll((error,usuarios)=>{
        if(error) return res.status(500).json(error);
        else{
            let admin = req.session.isAdmin;
            if(admin === 1){
                res.render('listaUsuarios',{
                    layout: 'admin',
                    title:"Panel de Usuarios",
                    user : req.session.username,
                    isAdmin : req.session.isAdmin,
                    isUserLogged : req.session.isUserLogged,
                    usuarios
                })
            }
            else{
                res.redirect('/')
            }
        }
    })*/
//});

router.get('/crearUsuario', (req, res, next)=>{
    res.render('creacionUsuario', {
        layout: 'admin',
    });
});

router.post('/guardarUsuario', (req, res)=>{
    let active;
    if(req.body.active === 'on'){
        active = 1;
    }else{ active = 0 }

    let usuario = {};
    usuario.username = req.body.username;
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.hash = req.body.hash;

    user.crearUsuario(usuario, (error, insertID)=>{
        if(insertID){
            res.redirect('/admin/usuarios');
        } else {
            res.status(500).json('Error al guardar'+ error);
        }
    });
});

router.post('/editarUsuario', (req, res)=>{
    let active;
    if(req.body.active === 'on'){
        active = 1;
    }else{ active = 0 }

    let usuario = {};
    usuario.username = req.body.username;
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.hash = req.body.hash;
    usuario.active = active;

    user.update(usuario, (error, result)=>{
        if(result){
            res.redirect('/admin/usuarios');
        } else {
            res.status(500).json('Error al editar usuario'+ error);
        }
    });
});

router.get('/eliminarUsuario/:id', (req, res, next)=>{
    let id = req.params.id;

    user.borrarUsuario(id, (error, result)=>{
        if(result){
            res.redirect('/admin/usuarios');
        }else{
            res.status(500).json('Error al eliminar usuario'+ error);
        }
    })
});

router.get('/editarUsuario/:id', (req, res)=>{
    let id = req.params.id;
    user.findById(id,(error, result)=>{
        if(result){
            res.render('edicionUsuario', {
                layout: 'admin',
                result: result[0]
            });
        }else {
            return res.status(500).json(error);
        }
    })
});



module.exports = router;
