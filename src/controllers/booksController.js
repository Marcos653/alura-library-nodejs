import books from "../models/Book.js";

class BookController {
  static getBook = (req, res) => {
    books
      .find()
      .populate("author")
      .exec((err, books) => {
        res.status(200).json(books);
      });
  };

  static getBookById = (req, res) => {
    const { id } = req.params;

    books
      .findById(id)
      .populate("author", "name")
      .exec((err, books) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - ID does not location` });
        } else {
          res.status(200).send(books);
        }
      });
  };

  static registerBook = (req, res) => {
    let book = new books(req.body);

    book.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - failed in register book` });
      } else {
        res.status(201).send(book.toJSON());
      }
    });
  };

  static updateBook = (req, res) => {
    const { id } = req.params;

    books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Book has been updated" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteBook = (req, res) => {
    const { id } = req.params;

    books.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Book has been delete" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static getBookBYeditora = (req, res) => {
    const { editora } = req.query;

    books.find(
      {
        editora: editora,
      },
      {},
      (err, books) => {
        res.status(200).send(books);
      }
    );
  };
}

export default BookController;
