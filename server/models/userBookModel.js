const mongoose = require("mongoose");

const userBookModel = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    private: {
        type: Boolean,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    status: {
        type: String,
        enum: ["wishList", "reading", "finished","dropped"],
        default: "wishList",
    },
    progress: {
        type: Number,
    },
});

const UserBook = mongoose.model("UserBook", userBookModel);

module.exports = UserBook;
