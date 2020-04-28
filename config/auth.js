const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
//We use this to extract the JWT sent by the user

var User = require('../models/user.js')

passport.use(new BearerStrategy(
    function(token, done) {
        console.log("this is the token",token)
      User.find({ auth_token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));