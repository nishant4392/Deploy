const bookCollectionModel = require("../models/bookModel");
const { validationResult } = require("express-validator");
const { checkSchema } = require("express-validator");

const bookValidationSchema = {
  title: {
    notEmpty: true,
    errorMessage: "title cannot be empty",
  },
  author: {
    notEmpty: true,
    errorMessage: "author cannot be empty",
  },
  asin: {
    notEmpty: true,
    custom: {
      options: (value, { req }) => {
        return bookCollectionModel
          .findOne({
            asin: value,
          })
          .then((book) => {
            if (book) {
              return Promise.reject("Book with this asin already exist");
            } else {
              return Promise.resolve();
            }
          });
      },
    },
    errorMessage: "author cannot be empty",
  },
};
