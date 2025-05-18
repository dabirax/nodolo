const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  res.send('<h1> Home Page </h1> <a href="/api/products"> products </a>');
});
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});
app.get("/api/products/:productID", (req, res) => {
  // console.log(req.params)
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send(`Product does'nt exist`);
  }
  console.log(singleProduct);
  res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  res.send("HELLO WORLD");
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
    console.log(sortedProducts);
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts < 1) {
    // res.status(200).send('no products match your search')
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
  //   res.send("HELLO john");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5170, () => {
  console.log("hello");
});
