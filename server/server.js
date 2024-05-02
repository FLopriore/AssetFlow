import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//import records from "./routes/record.js";

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI || "";
const app = express();

app.use(cors());
app.use(express.json());
//app.use("/record", records);

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