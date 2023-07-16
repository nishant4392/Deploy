const mongoose = require("mongoose");

const forumModel = mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    required: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentionedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Forum = mongoose.model("Forum", forumModel);

module.exports = Forum;
