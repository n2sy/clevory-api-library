const Book = require("../models/book.model");

exports.getAllBooks = async (req, res) => {
  try {
    let response = await Book.find();
    res.json({ listeLivres: response });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};

exports.createBook = async (req, res) => {
  let newBook = new Book(req.body);
  try {
    let response = await newBook.save();
    res
      .status(201)
      .json({ message: `le livre ${response.title} a été ajouté avec succès` });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};
