const Book = require("../models/book.model");

exports.getAllBooks = async (req, res) => {
  let filter = req.query.by;
  console.log(filter);

  try {
    let response = await Book.find({
      title: new RegExp(filter, "i"),
    }).notDeleted();
    res.json({ listeLivres: response });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};

exports.getBookById = async (req, res) => {
  try {
    let response = await Book.findById(req.params.id);
    if (!response) {
      res.status(404).json({
        message: "Book not found !",
      });
    }
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.deleteBook = async (req, res) => {
  try {
    let b = await Book.findById(req.params.id).notDeleted();
    if (!b) {
      res.status(404).json({
        message: "Book not found !",
      });
    }
    b.isDeleted = true;
    b.deleteAt = new Date();
    b.save();
    res.json({ message: "Book successfully deleted !" });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};

exports.updateBook = async (req, res) => {
  try {
    let reponse = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
    });
    if (!reponse) {
      res.status(404).json({
        message: "Book not found !",
      });
    }
    res.json({ message: `Book "${reponse.title}" updated` });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};

exports.restoreBook = async (req, res) => {
  try {
    let b = await Book.findById(req.params.id).deleted();
    if (!b) {
      res.status(404).json({
        message: "Book not found !",
      });
    }
    b.isDeleted = false;
    b.deleteAt = null;
    b.save();
    res.json({ message: "Book successfully restored !" });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};

exports.searchBooks = async (req, res) => {
  let year1 = req.query.year1;
  let year2 = req.query.year2;
  try {
    let response = await Book.find({
      year: {
        $gte: year1,
        $lte: year2,
      },
    }).notDeleted();
    res.json({ listeLivres: response });
  } catch (err) {
    res.status(400).json({ messsage: err.messsage });
  }
};
