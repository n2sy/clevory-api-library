const express = require("express");
const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/all", bookController.getAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/:id", bookController.getBookById);
router.post("/add", bookController.createBook);
router.put("/edit/:id", bookController.updateBook);
router.delete("/delete/:id", bookController.deleteBook);
router.delete("/restore/:id", bookController.restoreBook);

module.exports = router;
