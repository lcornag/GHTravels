var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPage', {
      title: 'Geekshubs Travels',
      ciudades: [
          {id:1, name:'finland', precio:399},
          {id:2, name:'marruecos', precio:670},
          {id:3, name:'nicaragua', precio:520},
          {id:4, name:'peru', precio:800},
          {id:5, name:'singapur', precio:899},
          {id:6, name:'suiza', precio:320}
      ],
  });
});

module.exports = router;
