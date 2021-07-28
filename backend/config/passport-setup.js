import passport from 'passport';

import passportGoogleOauth from 'passport-google-oauth20';
const GoogleStrategy = passportGoogleOauth.Strategy;

import keys from "./keys.js";
import User from "../models/user-model.js";

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use('google', new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id,
            displayName: profile.displayName,
            photos: profile.photos
        }, function (err, user) {
            return cb(err, user);
        });
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
