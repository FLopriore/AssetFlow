const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
            },
}
);
//Aggiunge automaticamente il field password allo schema
userSchema.plugin(passportLocalMongoose,{usernameField: "email"}); //Specifica che il campo username è quello dello Schema

module.exports = mongoose.model("User",userSchema);