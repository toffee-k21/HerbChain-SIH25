const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Load ABI (only the read functions needed)
const abi = [
  "function getProduct(string batchId) view returns (tuple(string batchId, string herbName, uint quantity, tuple(uint8 stepType, uint timestamp, string actorId, string quality, string location, string action, string details)[] steps))",
  "function getSteps(string batchId) view returns (tuple(uint8 stepType, uint timestamp, string actorId, string quality, string location, string action, string details)[])"
];

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

// EJS setup
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/record-step/:batchId", (req, res) => {
    const { batchId } = req.params;
    res.render("recordStep", { batchId });
  });

// Route: /product/:batchId
app.get("/product/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;

    const product = await contract.getProduct(batchId);
    const steps = await contract.getSteps(batchId);

    res.render("product", { product, steps });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from contract");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
