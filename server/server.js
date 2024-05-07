require('dotenv').config({path: './server/config.env'})
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Routes import
const AssetRoute = require("./routes/asset.route.js");
const ExpenseRoute = require("./routes/expense.route.js");
const IncomeRoute = require("./routes/income.route.js");
const ObjectiveRoute = require("./routes/objective.route.js");
const BudgetRoute = require("./routes/budget.route.js");
const UserRoute = require("./routes/user.route.js");
const VerifyRoute = require("./routes/verify.route.js");

//Session Imports
const User = require("./models/user.model.js");
const expressSession = require("express-session");
const passport = require("passport");

const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI || "";
const SECRET_KEY = process.env.SECRET_KEY || "";
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Affinchè possa prendere dai form i campi
app.use(expressSession(
    {
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }));  //secret passcode, è usata per segnare il session cookie.
app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(User.createStrategy());  //User.createStrategy() è una funzione di passport-local-mongoose che setta automaticamente una strategia
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use("/api/asset", AssetRoute);
app.use("/api/expense", ExpenseRoute);
app.use("/api/income", IncomeRoute);
app.use("/api/objective", ObjectiveRoute);
app.use("/api/budget", BudgetRoute);
app.use("/api/user", UserRoute);
app.use("/api/verify",VerifyRoute);

mongoose.connect(ATLAS_URI)
    .then(() => {
        console.log("Connected to database");

        // start the Express server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })