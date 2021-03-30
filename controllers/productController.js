const slugify = require("slugify");
const { Product } = require("../db/models");


exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: ["id"],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};


exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
  
exports.productUpdate = async (req, res) => {
    const { productId } = req.params;
    try {
      const foundProduct = await Product.findByPk(productId);
      if (foundProduct) {
        await foundProduct.update(req.body);
        res.status(200).json({ message: "Product updated successfully!" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  };
  
  exports.productDelete = async (req, res) => {
    const { productId } = req.params;
    try {
      const foundProduct = await Product.findByPk(productId);
      if (foundProduct) {
        await foundProduct.destroy();
        res.status(200).json({ message: "Product deleted successfully!" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      next(error);
    }
  };

  exports.fetchProduct = async (req, res, next) => {
    const { productID } = req.params;
    try {
      const product = await Product.findByPk(productID, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };
  