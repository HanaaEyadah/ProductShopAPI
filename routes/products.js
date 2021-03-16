const express = require("express");
const router = express.Router();


const {
    productCreate,
    productList,
    productUpdate,
    productDelete,
  } = require("../controllers/productController");
  // product Create
router.post("/", productCreate);
  // product List
  router.get("/", productList);
  // product update
  router.put("/:productId", productUpdate);
  // product Delete
router.delete("/:productId", productDelete);

 
  


  module.exports = router;