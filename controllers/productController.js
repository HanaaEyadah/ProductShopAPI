let products = require("../products");
const slugify = require("slugify");

exports.productCreate = (req, res) => {
    const id = products[products.length - 1].id + 1;
    console.log(req.body);
    const slug = slugify(req.body.name, { lower: true });
    const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
    products.push(newProduct);
    res.status(200).json(newProduct);
  };

  exports.productList = (req, res) => res.json(products);

  exports.productUpdate = (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId);
    if (foundProduct) {
      for (const key in req.body) foundProduct[key] = req.body[key];
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };

  exports.productDelete = (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId);
    if (foundCookie) {
      products = products.filter((product) => product.id !== +productId);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };