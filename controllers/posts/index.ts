import PostRepo from "../../schemas/post/repo";
import UpvoteRepo from "../../schemas/upvote/repo";
import {
  CreatePostParams,
  DeletePostParams,
  PostEntity,
} from "../../types/post/";
import AwsController from "../aws";
import { v4 as uuidv4 } from "uuid";
const PostSchema = require("../../schemas/post");

const postsPerPage = 9;
const postsFullComments = 3;
const postsOneComment = 3;
const postsWithNothing = 3;
// add another one here later for posts that have above a # of upvotes

const getPostsByUserByUuid = async (uuid: string): Promise<PostEntity[]> => {
  try {
    const posts = await PostRepo.getPostsByUserUuid(uuid);
    return posts;
  } catch (e) {
    throw e;
  }
};

// https://stackoverflow.com/questions/50600702/how-to-search-one-mongoose-collection-with-some-conditions-on-another-collection
const getFeedPosts = async (
  page: number
): Promise<any> /* Promise<PostEntity[]>*/ => {
  try {
    const posts = await PostRepo.getFeedPosts(page);
    return posts;
  } catch (e) {
    throw e;
  }
};

const deletePost = async (params: DeletePostParams) => {
  try {
    const { postUuid, key } = params;
    await AwsController.deleteFromS3(key);
    await PostRepo.deletePost(postUuid);
  } catch (e) {
    throw e;
  }
};

const getPostByUuid = async (postUuid: string): Promise<PostEntity> => {
  try {
    const post = await PostRepo.getPostByUuid(postUuid);
    return post;
  } catch (e) {
    throw e;
  }
};

const createPost = async (post: CreatePostParams): Promise<PostEntity> => {
  try {
    let buff = new Buffer(post.fileAsBase64, "base64");
    const audioUuid = uuidv4();
    const key = `public/${post.userUuid}/${audioUuid}.mp3`; // need an extension
    const s3AudioParams = {
      file: buff,
      key: key,
    };
    const uploadedAudio = await AwsController.uploadAudioToS3(s3AudioParams);
    const newPostParams = {
      title: post.title,
      storageKey: uploadedAudio.storageKey,
      linkToMedia: uploadedAudio.linkToMedia,
      userUuid: post.userUuid,
      uuid: uuidv4(),
    };
    const postEntity = await PostRepo.createPost(newPostParams);
    return postEntity;
  } catch (e) {
    throw e;
  }
};

const upvotePost = async (userUuid: string, postUuid: string) => {
  try {
    const didUserUpvote = await UpvoteRepo.getUserUpvotedPost(
      userUuid,
      postUuid
    );
    // remove the upvote
    if (didUserUpvote) {
      await UpvoteRepo.deleteUserUpvote(userUuid, postUuid);
    } else {
      // add upvote
      await UpvoteRepo.addUserUpvote(userUuid, postUuid);
    }
  } catch (e) {
    throw e;
  }
};
// get this when a user is logged in
const getAuthenticatedFeedPosts = async (page: any): Promise<PostEntity[]> => {
  try {
    const posts = await PostRepo.getFeedPosts(page);
    return posts;
  } catch (e) {
    throw e;
  }
};
export default {
  getAuthenticatedFeedPosts,
  getFeedPosts,
  getPostsByUserByUuid,
  createPost,
  getPostByUuid,
  upvotePost,
};
