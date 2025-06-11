const express = require("express");

const router = express.Router();

router.get("/all", f1);
router.get("/:id", f1);
router.post("/add", f1);
router.put("/edit/:id", f1);
router.delete("/delete/:id", f1);
