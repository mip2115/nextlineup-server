const UpvoteSchema = require("./");
import { v4 as uuidv4 } from "uuid";

const getUserUpvotedPost = async (
  userUuid: string,
  postUuid: string
): Promise<boolean> => {
  try {
    const user = await UpvoteSchema.findOne({
      userUuid: userUuid,
      postUuid: postUuid,
    });
    if (user === null) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};

const addUserUpvote = async (userUuid: string, postUuid: string) => {
  try {
    const userUpvote = new UpvoteSchema({
      uuid: uuidv4(),
      postUuid: postUuid,
      userUuid: userUuid,
    });
    await userUpvote.save();
  } catch (e) {
    throw e;
  }
};

const deleteUserUpvote = async (userUuid: string, postUuid: string) => {
  try {
    await UpvoteSchema.deleteOne({
      userUuid: userUuid,
      postUuid: postUuid,
    });
  } catch (e) {
    throw e;
  }
};

export default {
  getUserUpvotedPost,
  deleteUserUpvote,
  addUserUpvote,
};
