const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let data = fs.readFileSync("./products.json", "utf-8");
let products = JSON.parse(data);

app.get("/", (req, res) => {
  let data = fs.readFileSync("./products.json", "utf-8");
  products = JSON.parse(data);
  // console.log(products);
  res.send(JSON.stringify(products));
});

app.get("/products/:id", (req, res) => {
  res.send(products[parseInt(req.params.id)]);
});

app.post("/", (req, res) => {
  let newProduct = {
    id: parseInt(products[products.length - 1].id) + 1,
    name: req.body.name,
    brand: req.body.brand,
    amount: parseInt(req.body.amount),
    price: parseInt(req.body.price),
  };
  products.push(newProduct);
  fs.writeFileSync("./products.json", JSON.stringify(products));

  res.send(products);
});

app.post("/reset", (req, res) => {
  products = req.body;
  fs.writeFileSync("./products.json", JSON.stringify(products));
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index == -1) {
    res.status(404).send("invalid product id");
  }
  products[index].amount = parseInt(req.body.amount);

  fs.writeFileSync("./products.json", JSON.stringify(products));

  res.send(products[parseInt(req.params.id)]);
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  console.log(index);
  if (index == -1) {
    res.status(404).send("invalid product id");
  }
  let product = products[parseInt(req.params.id)];
  products.splice(index, 1);
  fs.writeFileSync("./products.json", JSON.stringify(products));
  res.send(product);
});

app.listen(3001, () => console.log("listening on port 3001"));
