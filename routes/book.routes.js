const express = require("express");
const bookController = require("../controllers/book.controller");
const isAuth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/all", isAuth, role("admin"), bookController.getAllBooks);
router.get("/search", isAuth, bookController.searchBooks);
router.get("/:id", isAuth, bookController.getBookById);
router.post("/add", isAuth, role("admin"), bookController.createBook);
router.put("/edit/:id", isAuth, role("admin"), bookController.updateBook);
router.delete("/delete/:id", isAuth, role("admin"), bookController.deleteBook);
router.delete(
  "/restore/:id",
  isAuth,
  role("admin"),
  bookController.restoreBook
);

module.exports = router;
