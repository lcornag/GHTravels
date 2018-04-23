let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let usuarioModelo = require('../../models/usuarioModelo');

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        usuarioModelo.authenticate(email, password, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Invalid email or password.' });
            }

            return done(null, user);
        });
    }
));

module.exports = passport;