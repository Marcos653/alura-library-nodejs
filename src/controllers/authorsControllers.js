import authors from "../models/Author.js";

class AuthorController {
  static getAuthor = (req, res) => {
    authors.find((err, authors) => {
      res.status(200).json(authors);
    });
  };

  static getAuthorById = (req, res) => {
    const { id } = req.params;

    authors.findById(id, (err, authors) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - ID does not location` });
      } else {
        res.status(200).send(authors);
      }
    });
  };

  static registerAuthor = (req, res) => {
    let author = new authors(req.body);

    author.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - failed in register Author` });
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  };

  static updateAuthor = (req, res) => {
    const { id } = req.params;

    authors.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Author has been updated" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteAuthor = (req, res) => {
    const { id } = req.params;

    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Author has been delete" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default AuthorController;
