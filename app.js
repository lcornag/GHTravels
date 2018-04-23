const express = require('express');
const Sequelize = require('sequelize');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('hbs');
const logger = require('morgan');
const flash = require('connect-flash');
let winston = require('./config/winston');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let createError = require('http-errors');
let SequelizeStore = require('connect-session-sequelize')(session.Store);
let sequelize = require('./config/sqldb');

let usuarioModelo = require('./models/usuarioModelo');

let admins = require('./routes/admins');
let index = require('./routes/index');
let emailer = require('./routes/emailer');

const app = express();
app.use(cookieParser());
// view engine setup
app.use('/', express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerPartials(`${__dirname}/views/partials/mainpage`);

app.use(flash());

app.use(logger('combined',{stream: winston.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


////////////////////////////////
// passport & session config
let myStore = new SequelizeStore({
    db:sequelize
});
app.use(session({
    secret:'secret',
    name:'GHTravelsSession',
    store: myStore,
    resave:false,
    saveUninitialized:true
}));
myStore.sync();

app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////

app.use('/emailer',emailer);
app.use('/', index);
app.use('/admins', admins);

passport.use(new LocalStrategy(
    {
        usernameField:'username',
        passwordField:'password'
    },
    function(username, password, done) {
        usuarioModelo.findOne({
            where:{
                username: username,
                password: password
            }
        }).then(user=>{
            if(!user) {
                console.log("no");
                return done(null, false);
            }
            if(user){
                console.log(user);
                return done(null, 'login correcto');
            }
        })
    }
));

app.use(function(req, res, next) {
  next(createError(404));
});
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
});
// global error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, ()=>{
    console.log("Servidor levantado en el puerto 3000");
});