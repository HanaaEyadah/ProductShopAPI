const express = require("express");
const router = express.Router();


const {
    productList,
    productCreate,
    productUpdate,
    productDelete,
    fetchProduct,
  } = require("../controllers/productController");
  
  router.get("/", productList);
  router.post("/", productCreate);
  router.put("/:productId", productUpdate);
  router.delete("/:productId", productDelete);
  router.get("/:productID", fetchProduct);


  module.exports = router;