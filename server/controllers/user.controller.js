const User = require("../models/user.model.js");
const passport = require("passport")

// TODO: check existing user
const createUser = async (req, res) => {
    const newUser = new User({email: req.body.email}); //Crea l'user e gli chiede come param l'email
    User.register(newUser, req.body.password, (error, user) => {
        if (error) {
            res.status(500).json({message: `Your account could not be created. Error: ${error}`});
        } else {
            res.status(200).json({message: 'Account created successfully'});
        }
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