const express = require("express");
const { connection } = require("./db");
const { auth } = require("./middlewares/auth.middleware");
const { productRouter } = require("./routes/products.route");
const { userRouter } = require("./routes/users.route");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Home Page
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Page");
});

// Routes:
app.use("/users", userRouter);
// Auth middleware is required to give authorization for the routes below it.
app.use(auth);
app.use("/products", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Mongo");
  } catch (error) {
    console.log("Not connected to Mongo");
  }
  console.log("Listening to the port");
});
