
import express from 'express';
import passport from 'passport';

const CLIENT_HOME_PAGE_URL = "http://localhost:3000/YoutubeRevenueSplit";
const router = express.Router();

router.use(express.json());

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log("req user: ", req.user);
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get("/google",
    passport.authenticate("google",
        { scope: ['profile', 'email'] }));

// sign up locally
router.post('/register',
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// sign in locally
router.post('/login',
    passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

// sign in locally
router.get('/logoff', function (req, res) {
    req.logout();
    req.session = null;
    res.redirect(CLIENT_HOME_PAGE_URL);

    // delete req.user;
    console.log("successfully logged out")
    return true
});

// redirect to home page after successfully login via google
router.get(
    "/google/redirect",
    passport.authenticate("google", {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: "/auth/login/failed",
    })
);

export default router;