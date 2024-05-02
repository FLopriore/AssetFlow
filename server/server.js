import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//import records from "./routes/record.js";
const AssetRoute = require("./routes/asset.route.js");
const ExpenseRoute = require("./routes/expense.route.js");
const IncomeRoute = require("./routes/income.route.js");
const ObjectiveRoute = require("./routes/objective.route.js");
const BudgetRoute=require("./routes/budget.route.js");

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI || "";
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false})); //Affinchè possa prendere dai form i campi
//app.use("/record", records);

//routes
app.use("/api/asset",AssetRoute);
app.use("/api/expense",ExpenseRoute);
app.use("/api/income",IncomeRoute);
app.use("/api/objective",ObjectiveRoute);
app.use("/api/budget",BudgetRoute);

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