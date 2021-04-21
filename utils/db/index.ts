import mongoose from "mongoose";
import UserSchema from "../../schemas/user";
import PostSchema from "../../schemas/post";
import ThoughtSchema from "../../schemas/thought";
import UpvoteSchema from "../../schemas/upvote";

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/music-social-media", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

const getDbConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/music-social-media", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};

const closeDb = async () => {
  try {
    await mongoose.connection.close();
  } catch (e) {
    throw e;
  }
};

const dropAllCollections = async () => {
  try {
    await UserSchema.deleteMany({});
    await PostSchema.deleteMany({});
    await ThoughtSchema.deleteMany({});
    await UpvoteSchema.deleteMany({});
  } catch (e) {
    throw new Error(e.toString());
  }
};
export default {
  connectToDb,
  getDbConnection,
  dropAllCollections,
  closeDb,
};
