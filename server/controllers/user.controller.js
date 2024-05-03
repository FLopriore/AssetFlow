const User = require("../models/user.model.js");
const passport = require("passport")

//TODO: Specify and else
const CreateUser = async (req,res,next) =>{
    const newUser = new User({email: req.body.email}); //Crea l'user e gli chiede come param l'email
    User.register(newUser, req.body.password, (error, user) => {
        if (user) next();
        });
};

const AuthUser = passport.authenticate("local",
{
    failureRedirect: "/user/login", //Route Lato Client
    failireFlash: "Login non riuscito",
    successRedirect:"/", //Route lato Client
    successFlash:"Login non riuscito"
}
);


module.exports = {CreateUser,AuthUser};