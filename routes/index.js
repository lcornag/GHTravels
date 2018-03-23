var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('mainPage', {
      title: 'Geekshubs Travels',
      ciudades: [
          {id:1, name:'Finland', precio:399},
          {id:2, name:'Marruecos', precio:670},
          {id:3, name:'Nicaragua', precio:520},
          {id:4, name:'Peru', precio:800},
          {id:5, name:'Singapur', precio:899},
          {id:6, name:'Suiza', precio:320}
      ]
  });
});
router.get('/destino',function(req,res,next){
    res.render('destino');
});

module.exports = router;
