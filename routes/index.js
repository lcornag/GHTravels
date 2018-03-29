var express = require('express');
var router = express.Router();
var app = express();
var createError = require('http-errors')

let ciudades = [
    {id:1, name:'Finland', precio:399},
    {id:2, name:'Marruecos', precio:670},
    {id:3, name:'Nicaragua', precio:520},
    {id:4, name:'Peru', precio:800},
    {id:5, name:'Malaysia', precio:899},
    {id:6, name:'Suiza', precio:320},
];
/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('mainPage', {
          title: 'Geekshubs Travels',
          layout:false,
          ciudades: ciudades,
          reglog: [
              {register: 'signup'},
              {login: 'login'}
          ]
  });
});


function listaCiudades(ciudades){
    var arrayCiudades = Array();
    for(var i = 0;i < ciudades.length; i++){
        arrayCiudades.push(ciudades[i].name);
    }
    return arrayCiudades;
}
router.get('/destino/:id', function(req, res,next) {
    var arrayCiudades = listaCiudades(ciudades);
    if(arrayCiudades.includes(req.params.id)) {
        res.render('destino',
            {
                id: req.params.id,
                layout: false
            });
    }else{
        //destino/404 handler
        next(createError(404));
        app.use(function(err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
});

router.get('/:reglog', function(req,res,next){
   if(req.params.reglog === 'login'){
       res.render('login');
   }else if(req.params.reglog === 'register'){
       res.render('register');
   }else{
       // mainpage 404 handler
       next(createError(404));
       app.use(function(err, req, res) {
           res.locals.message = err.message;
           res.locals.error = req.app.get('env') === 'development' ? err : {};
           // render the error page
           res.status(err.status || 500);
           res.render('error');
       });
    }
});
//TESTING JSON FROM FORM
router.post('/register', function(req,res){
    var user = req.body;
    user.psw = (function(){
        var hash = 0;
        for (i = 0; i < req.body.psw.length; i++) {
            char = req.body.psw.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    })();
    console.log(user);
    res.render('vacio.hbs',{
        usuario: user
    });
});


module.exports = router;