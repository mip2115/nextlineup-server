const mongoose = require("mongoose");
const { Schema } = mongoose;

const limitValue = 4;

const postSchema = new Schema({
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
  uuid: {
    type: String,
    required: true,
  },
  userUuid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  linkToMedia: {
    type: String,
    required: true,
  },
  storageKey: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
});

postSchema.statics.getFeedPosts = async function (page) {
  try {
    const postsToSkip = page * limitValue;
    const posts = await this.find({}, null, {
      skip: postsToSkip,
      limit: limitValue,
    });
    return posts;
  } catch (e) {
    throw new Error(`unable to fetch feed posts for page ${page}`);
  }
};

postSchema.statics.getPostsByUserUid = async function (uid) {
  try {
    const posts = await this.find({ userUid: uid });
    if (posts.length == 0) {
      return false;
    }
    return posts;
  } catch (e) {
    return false;
  }
};

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
