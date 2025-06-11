const Book = require("../models/book.model");

exports.createBook = async (req, res) => {
  let newBook = new Book(req.body);
  try {
    let response = await newBook.save();
    res.status(201).json({ retour: response });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};
