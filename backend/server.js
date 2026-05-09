const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let customers = [];

// Add customer
app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;

  const newCustomer = {
    id: Date.now(),
    name,
    email,
    phone,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

// Get all customers
app.get("/customers", (req, res) => {
  res.json(customers);
});

// Delete customer
app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id);

  customers = customers.filter((customer) => customer.id !== id);

  res.json({ message: "Customer deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});