const express = require("express");
const router = express.Router();
const {
  createStockTransaction,
  getAllStockTransactions,
  searchStocks,
  getStockTransactionsByProduct,
  getStockTransactionsBySupplier,
} = require("../controller/stocktransaction");

router.post("/createStockTransaction", async (req, res) => {
  try {
    console.log("Received stock transaction request:", req.body);
    const { product, type, quantity, supplier } = req.body;

    // Validate required fields
    if (!product || !type || !quantity || !supplier) {
      console.log("Missing fields:", { product, type, quantity, supplier });
      return res.status(400).json({
        error: "Missing required fields: product, type, quantity, supplier",
      });
    }

    // ...existing code...
  } catch (error) {
    console.error("Error creating stock transaction:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/getallStockTransaction", getAllStockTransactions);
router.get("/product/:productId", getStockTransactionsByProduct);
router.get("/supplier/:supplierId", getStockTransactionsBySupplier);
router.get("/searchstocks", searchStocks);

module.exports = router;
