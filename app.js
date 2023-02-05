const express = require("express");
const mongoose = require("mongoose");

const app = express();

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}

app.listen(process.env.PORT, () => {
  console.log(`RESTful API is up and running on PoRT ${process.env.PORT}`);

  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING) // here it connects to mongodb
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
});

app.use(express.json());
const path = require("path");
const userController = require("./controllers/UserController.js");
const burgerController = require("./controllers/BurgerController.js");
const orderController = require("./controllers/OrderController.js");
//routes to the respective controller
app.use("/users", userController); //app.js > userController > userService > userModel
app.use("/burgers", burgerController); //app.js > burgerController > burgerService > burgerModel
app.use("/orders", orderController);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    res.status(500).send(err);
  });
});
