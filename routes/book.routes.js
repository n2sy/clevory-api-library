const express = require("express");
const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/all", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/add", bookController.createBook);
// router.put("/edit/:id", f1);
// router.delete("/delete/:id", f1);

module.exports = router;
