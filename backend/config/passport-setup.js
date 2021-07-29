import passport from 'passport';
import bcrypt from "bcryptjs";

import passportGoogleOauth from 'passport-google-oauth20';
const GoogleStrategy = passportGoogleOauth.Strategy;

import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import keys from "./keys.js";
import User from "../models/user-model.js";


//*********************Local Sign Up Strategy*********************

// We are using named strategies since we have one for login and one
// for signup

// By default, if there is no name, it would just be called 'local'
passport.use('local-signup', new LocalStrategy(
    function (username, password, done) {
        // # If checking the data, do so here

        // Check to see if the user trying to login already
        User.findOne({ id: username }, async (err, user) => {
            // If there are any errors, return the error
            if (err) { return done(err); }

            // If a user exists with either of those ...
            if (user) {
                return done(null, false,
                    { signupMessage: 'That username is taken.' }
                );
            } else {
                // Create the user
                const newUser = new User();
                newUser.id = username.toLowerCase();
                newUser.name = username.toLowerCase();
                newUser.email = '';
                newUser.picture = '';

                const hashedPassword = await bcrypt.hash(password, 10);

                newUser.password = hashedPassword;

                newUser.save((err) => {
                    if (err) { throw err }
                });
                return done(null, newUser);
            };
        });
    }));

passport.use('local-signin', new LocalStrategy(
    function (username, password, done) {
        // # If checking the data, do so here
        User.findOne({ id: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare(password, user.password, function(err,result) {
                if (err) {
                    console.error(err);
                }

                if (result) {
                    return done(null, user);
                }
                else {
                    console.log("passwords are different");
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));


//*********************GOOGLE Strategy*********************


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use('google', new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            id: profile.id,
        }).then((user) => {
            if (user) {
                done(null, user);
            }
            else {
                const newUser = new User();
                newUser.id = profile.id;
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.picture = profile.photos[0].value;

                newUser.save((err) => {
                    if (err) { throw err }
                });
                return done(null, newUser);
            }
        })
    }));


passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});