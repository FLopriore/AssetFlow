require('dotenv').config({path: './server/config.env'}) //Utilizziamo questo file per le variabili d'ambiente
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //Inizializzo Mongoose

//Routes import 
const AssetRoute = require("./routes/asset.route.js");
const ExpenseRoute = require("./routes/expense.route.js");
const IncomeRoute = require("./routes/income.route.js");
const ObjectiveRoute = require("./routes/objective.route.js");
const BudgetRoute = require("./routes/budget.route.js");
const UserRoute = require("./routes/user.route.js");
const VerifyRoute = require("./routes/verify.route.js");
const PriceRoute = require("./routes/price.route.js");

//Session Imports
const User = require("./models/user.model.js");
const passport = require("passport");

//Chiamiamo le variabili d'ambiente
const PORT = process.env.PORT || 3000; //Non necessaria dopo il deploy ma solo a scopo di testing
const ATLAS_URI = process.env.ATLAS_URI || "";
const app = express(); //Inizializzazione Express

//middleware
app.use(cors());
app.use(express.json()); //Middleware che serve per parsare le richieste che arrivano al server 
app.use(express.urlencoded({extended: true})); //Affinchè possa prendere dai form i campi //secret passcode
app.use(passport.initialize());

//passport
passport.use(User.createStrategy());  //User.createStrategy() è una funzione di passport-local-mongoose che setta automaticamente una strategia


//Utilizzo middleware per un determinato percorso
app.use("/api/asset", AssetRoute);
app.use("/api/expense", ExpenseRoute);
app.use("/api/income", IncomeRoute);
app.use("/api/objective", ObjectiveRoute);
app.use("/api/budget", BudgetRoute);
app.use("/api/user", UserRoute);
app.use("/api/verify", VerifyRoute);
app.use("/api/price", PriceRoute);

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