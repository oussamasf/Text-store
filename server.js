const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

// set the envirement variable
dotenv.config({ path: "./config.env" });

// set the db
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db)
  .then((con) => {
    console.log("db is connected ...");
  })
  .catch((err) => console.log(err));

// server port
const { PORT } = process.env;

// emitting the server
app.listen(PORT, () => {
  console.log("app is running");
});

process.on("uncaughtException", (err) => {
  console.log(err.stack);
});
