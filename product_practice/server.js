import express from "express";
import cors from "cors";
const app = express();
const PORT = 3311;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for products
let products = [
  { id: 1, name: "Laptop", price: 1200, amount: 5 },
  { id: 2, name: "Mouse", price: 25, amount: 50 },
  { id: 3, name: "Keyboard", price: 75, amount: 30 },
];

// GET /api/products - Get all products
app.get("/api/products", (_req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get product by id
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// POST /api/products - Add new product
app.post("/api/products", (req, res) => {
  const { name, price, amount } = req.body;

  if (!name || price === undefined || amount === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, price, amount" });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    amount: parseInt(amount),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update product
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { name, price, amount } = req.body;

  if (!name || price === undefined || amount === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, price, amount" });
  }

  products[productIndex] = {
    id,
    name,
    price: parseFloat(price),
    amount: parseInt(amount),
  };

  res.json(products[productIndex]);
});

// DELETE /api/products/:id - Delete product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);
  res.json(deletedProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
