const mongoose = require("mongoose");
const app = require("./app");
require("dotenv/config");



const dbURI = process.env.DB_URL_NEW;
const port = process.env.PORT;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Couldn't connect to the database");
    console.log(err);
  });
