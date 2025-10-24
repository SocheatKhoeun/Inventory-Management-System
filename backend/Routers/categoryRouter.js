const express = require("express");
const router = express.Router();
const {
  authmiddleware,
  adminmiddleware,
} = require("../middleware/Authmiddleware");
const {
  createCategory,
  getCategory,
  updateCategory,
  RemoveCategory,
  Searchcategory,
} = require("../controller/categorycontroller");

// GET all categories
router.get("/getcategory", getCategory);

// GET search categories
router.get("/searchcategory", Searchcategory);

// POST create category
router.post("/createcategory", authmiddleware, adminmiddleware, createCategory);

// PUT update category
router.put(
  "/updatecategory/:CategoryId",
  authmiddleware,
  adminmiddleware,
  updateCategory
);

// DELETE remove category
router.delete(
  "/removecategory/:CategoryId",
  authmiddleware,
  adminmiddleware,
  RemoveCategory
);

module.exports = router;
