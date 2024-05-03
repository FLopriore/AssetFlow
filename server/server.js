const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//import records from "./routes/record.js";
//Routes import
const AssetRoute = require("./routes/asset.route.js");
const ExpenseRoute = require("./routes/expense.route.js");
const IncomeRoute = require("./routes/income.route.js");
const ObjectiveRoute = require("./routes/objective.route.js");
const BudgetRoute=require("./routes/budget.route.js");
const UserRoute = require("./routes/user.route.js");

//Session Imports
const User = require("./models/user.model.js");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI || "";
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false})); //Affinchè possa prendere dai form i campi
app.use(expressSession({secret: "secret_passcode"}));  //secret passcode, è usata per segnare il session cookie. 
app.use(passport.initialize());
app.use(passport.session());
//app.use("/record", records);

//passport
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate() è un metodo di mongoose-passport-local
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//routes
app.use("/api/asset",AssetRoute);
app.use("/api/expense",ExpenseRoute);
app.use("/api/income",IncomeRoute);
app.use("/api/objective",ObjectiveRoute);
app.use("/api/budget",BudgetRoute);
app.use("/api/user",UserRoute);

mongoose.connect(uri)
.then(()=> {
  console.log("Connected to database");

  // start the Express server
  app.listen(PORT, ()=> {
      console.log(`Server listening on port ${PORT}`);
  });
})
.catch((e) => {
  console.log(e);
})