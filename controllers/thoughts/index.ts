// `http://localhost:5000/api/get-thoughts-for-posts`,
import express from "express";
import ThoughtRepo from "../../schemas/thought/repo";
import PostRepo from "../../schemas/post/repo";
import { CreateThoughtParams, ThoughtEntity } from "../../types/thought/";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const getThoughtsByUserUuid = async (uuid: string) => {
  try {
    const thoughts = await ThoughtRepo.getThoughtsByUserUuid(uuid);
    return thoughts;
  } catch (e) {
    throw e;
  }
};

const createThought = async (thought: any): Promise<any> => {
  try {
    const post = await PostRepo.getPostByUuid(thought.postUuid);

    if (post.thoughts.length >= 2) {
      throw new Error("post already has two thoughts");
    }

    const userUuid = thought.userUuid;
    if (post.thoughts.length > 0 && post.thoughts[0].userUuid === userUuid) {
      throw new Error("user already commented on post");
    }

    const thoughtParams = {
      postUuid: thought.postUuid,
      userUuid: userUuid,
      content: thought.content,
      uuid: uuidv4(),
    };

    const thoughtEntity = await ThoughtRepo.createThought(thoughtParams);
    return thoughtEntity;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const deleteThoughts = async (thoughtUuids: string[]) => {
  try {
    await ThoughtRepo.deleteThoughts(thoughtUuids);
  } catch (e) {
    throw new Error(e.toString());
  }
};

const getThoughtsForPosts = async (
  postsUuids: string[]
): Promise<ThoughtEntity[]> => {
  try {
    // this function should take all the post uids
    // search for all thoughts where the postUid is in this list of postUids
    // you'll return a bunch of thoughts, the postUid is already in there
    const thoughts = await ThoughtRepo.getThoughtsForPostUuids(postsUuids);
    return thoughts;
  } catch (e) {
    throw e;
  }
};
export default {
  createThought,
  getThoughtsByUserUuid,
  getThoughtsForPosts,
  deleteThoughts,
};
