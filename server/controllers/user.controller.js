const User = require("../models/user.model.js");
const passport = require("passport")

//TODO: Specify and else
const createUser = async (req, res, next) => {
    const newUser = new User({email: req.body.email}); //Crea l'user e gli chiede come param l'email
    User.register(newUser, req.body.password, (error, user) => {
        if (user) {
            next();
            // add redirect to login page
        }
        // else ADD ERROR MESSAGE
    });
};

const authUser = passport.authenticate("local",
    {
        failureRedirect: "/user/login", //Route Lato Client
        failureFlash: "Login non riuscito",
        successRedirect: "/", //Route lato Client
        successFlash: "Login riuscito"
    }
);


module.exports = {createUser, authUser};