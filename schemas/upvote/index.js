const mongoose = require("mongoose");
const { Schema } = mongoose;

const upvoteSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  postUuid: {
    type: String,
    required: true,
  },
  userUuid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
  deletedAt: {
    type: String,
  },
  updatedAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const Upvote = mongoose.model("upvotes", upvoteSchema);
module.exports = Upvote;
