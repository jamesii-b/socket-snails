const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const path = require("path");
//  dbConnection()

const dbConnection = require("./lib/dbConnection");

//routes

const salesRoute = require("./routes/salesRoute");
app.use("/", salesRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
