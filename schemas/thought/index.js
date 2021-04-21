const mongoose = require("mongoose");
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  createdAt: {
    type: String,
    default: Date.now(),
  },
  deletedAt: {
    type: String,
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
  userUuid: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  postUuid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

thoughtSchema.statics.saveThought = async function (thought, postUid) {
  try {
    const newThoughtDoc = new this(thought);
    await newThoughtDoc.save();
    return newThoughtDoc;
  } catch (e) {
    throw new Error(`unable to save thought`);
  }
};

thoughtSchema.statics.getThoughtsForPosts = async function (posts) {
  try {
    const thoughts = await this.find({
      postUid: { $in: posts },
    });
    return thoughts;
  } catch (e) {
    throw new Error(`unable to fetch feed thoughts for posts`);
  }
};

// prob paginate this
thoughtSchema.statics.getThoughtsByUserUid = async function (uid) {
  try {
    const thoughts = await this.find({ userUid: uid });
    return thoughts;
  } catch (e) {
    return false;
  }
};

const Thought = mongoose.model("thoughts", thoughtSchema);
module.exports = Thought;
