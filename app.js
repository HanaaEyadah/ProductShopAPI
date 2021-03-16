const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);




app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
