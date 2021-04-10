const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/products", productRoutes);
app.use(userRoutes);

app.use((_, res, __) => {
  res.status(404).json({ message: "Path not found" });
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
