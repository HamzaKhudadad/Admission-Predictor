'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
//add user id in session
passport.serializeUser((user, done) => {
   console.log("s");
    done(null, user.id);
    console.log(user.username+"selrialze");

});
// match user store in session
passport.deserializeUser((id, done) => {

    User.findById(id, (err, user) => {
         console.log("deserial");
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

  var email = req.body.email;

    User.findOne({'email': email}, (err, user) => {
       if(err){

           console.log("error find");
           return done(err);
       }

        if(user){
            return done(null, false, req.flash('error', 'User with email already exist'));
        }

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        console.log(newUser);
        newUser.save((err) => {
          if (err) console.log(err)
            else console.log("saved")
                console.log("done with everything");
        });
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,email,password, done) => {
 console.log(email);
 console.log(password);

  var email = req.body.email;
  var password = req.body.password;


    User.findOne({'email': email}, (err, user) => {

        if(err){
          console.log(err);
           return done(err);
        }


        if(!user || !user.validUserPassword(password)){

            console.log("error user or paword wrong");
          //  return done(null, false, { message: 'Incorrect username.' });
            }

            else{console.log("loged");
            return done(null, user);}

    });
}));
