const express = require("express");
const router = express.Router();
const {
  createOrder,
  searchOrder,
  updatestatusOrder,
  getOrder,
  getOrderStatistics,
  Removeorder,
} = require("../controller/orderController");
const { authmiddleware } = require("../middleware/Authmiddleware");

router.get("/getorders", authmiddleware, getOrder);
router.get("/Searchdata", authmiddleware, searchOrder);
router.get("/graphstatusorder", authmiddleware, getOrderStatistics);
router.post("/createorder", authmiddleware, createOrder);
router.put("/updatestatusOrder/:OrderId", authmiddleware, updatestatusOrder);
router.delete("/removeorder/:OrderId", authmiddleware, Removeorder);

module.exports = router;
