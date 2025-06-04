const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  products = await Product.find({}).sort("-name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    // options: 'i' is for case insensitive
  }
  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    // products = products.sort();
    console.log(sort)
  }
  const products = await result;
  //   products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
