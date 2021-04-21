const PostSchema = require("./");
import ThoughtRepo from "../thought/repo";
import { PostEntity } from "../../types/post";
import { v4 as uuidv4 } from "uuid";
const postsPerPage = 9;

const fromPostRepoToPostEntity = (post: any): PostEntity => {
  if (post.thoughts === undefined) {
    post.thoughts = [];
  }
  if (post.upvotes === undefined) {
    post.upvotes = [];
  }
  const postEntity: PostEntity = {
    uuid: post.uuid,
    updatedAt: post.updatedAt,
    createdAt: post.createdAt,
    deletedAt: post.deletedAt,
    title: post.title,
    awsKey: post.awsKey,
    linkToMedia: post.linkeToMedia,
    userUuid: post.userUuid,
    thoughts: post.thoughts,
    upvotes: post.upvotes,
  };
  // console.log("POST");
  // console.log(postEntity);
  return postEntity;
};

const createPost = async (postParams: any): Promise<PostEntity> => {
  try {
    // when testing you need to cast to ObjectId
    const postSchema = new PostSchema(postParams);
    await postSchema.save();
    const newPost = fromPostRepoToPostEntity(postParams);
    return newPost;
  } catch (e) {
    throw e;
  }
};

const getPostsByUserUuid = async (uuid: any): Promise<PostEntity[]> => {
  try {
    const postEntities: PostEntity[] = [];

    const posts = await PostSchema.find();
    for (let post in posts) {
      const postEntity = fromPostRepoToPostEntity(post);
      postEntities.push(postEntity);
    }
    return postEntities;
  } catch (e) {
    throw e;
  }
};

const getFeedPostsWithFullComments = async (
  page: number
): Promise<PostEntity[]> => {
  try {
    const postEntities: PostEntity[] = [];
    const posts = await PostSchema.aggregate([
      {
        $lookup: {
          from: "thoughts",
          localField: "uuid",
          foreignField: "postUuid",
          as: "thoughts",
        },
      },
      { $match: { "thoughts.1": { $exists: true } } }, // if thoughts has 2 elements
      { $skip: page * 3 },
      { $limit: 3 },
    ]);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postEntity = fromPostRepoToPostEntity(post);
      postEntities.push(postEntity);
    }
    return postEntities;
  } catch (e) {
    throw e;
  }
};

const getFeedPostsWithOneComment = async (
  page: number
): Promise<PostEntity[]> => {
  try {
    const postEntities: PostEntity[] = [];
    const posts = await PostSchema.aggregate([
      {
        $lookup: {
          from: "thoughts",
          localField: "uuid",
          foreignField: "postUuid",
          as: "thoughts",
        },
      },
      { $match: { "thoughts.0": { $exists: true } } }, // if thoughts has 2 elements
      { $match: { "thoughts.1": { $exists: false } } },
      { $skip: page * 3 },
      { $limit: 3 },
    ]);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postEntity = fromPostRepoToPostEntity(post);
      postEntities.push(postEntity);
    }
    return postEntities;
  } catch (e) {
    throw e;
  }
};

const getFeedPostsWithNoComments = async (
  page: number
): Promise<PostEntity[]> => {
  try {
    const postEntities: PostEntity[] = [];
    const posts = await PostSchema.aggregate([
      {
        $lookup: {
          from: "thoughts",
          localField: "uuid",
          foreignField: "postUuid",
          as: "thoughts",
        },
      },
      { $match: { "thoughts.postUuid": { $exists: false } } },
      { $skip: page * 3 },
      { $limit: 3 },
    ]);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postEntity = fromPostRepoToPostEntity(post);
      postEntities.push(postEntity);
    }
    return postEntities;
  } catch (e) {
    throw e;
  }
};

const getFeedPosts = async (page: number): Promise<PostEntity[]> => {
  try {
    const postsWithFullComments = await getFeedPostsWithFullComments(page);
    const postsWithOneComment = await getFeedPostsWithOneComment(page);
    const postsWithNoComments = await getFeedPostsWithNoComments(
      page
      //postsWithFullComments.length - postsWithOneComment.length
    );
    const posts = [
      ...postsWithFullComments,
      ...postsWithOneComment,
      ...postsWithNoComments,
    ];
    return posts;
  } catch (e) {
    throw e;
  }
};

const deletePost = async (postUuid: string) => {
  try {
    await ThoughtRepo.deleteThoughtsForPosts([postUuid]);
    await PostSchema.deleteOne({ uuid: postUuid });
  } catch (e) {
    throw e;
  }
};

const getPostByUuid = async (postUuid: string): Promise<PostEntity> => {
  try {
    const posts = await PostSchema.aggregate([
      {
        $lookup: {
          from: "thoughts",
          localField: "uuid",
          foreignField: "postUuid",
          as: "thoughts",
        },
      },
      {
        $lookup: {
          from: "upvotes",
          localField: "uuid",
          foreignField: "postUuid",
          as: "upvotes",
        },
      },
    ]);
    const post = posts[0];
    console.log("POSTS ARE");
    console.log(post);
    // const post = await PostSchema.findOne({ uuid: postUuid });
    const postEntity = fromPostRepoToPostEntity(post);
    return postEntity;
  } catch (e) {
    throw e;
  }
};

const getAuthenticatedFeedPosts = async (
  page: number
): Promise<PostEntity[]> => {
  try {
    const postEntities: PostEntity[] = [];

    const posts = await PostSchema.find()
      .skip(page * postsPerPage)
      .limit(postsPerPage);
    for (let post in posts) {
      const postEntity = fromPostRepoToPostEntity(post);
      postEntities.push(postEntity);
    }
    return postEntities;
  } catch (e) {
    throw e;
  }
};

export default {
  createPost,
  deletePost,
  getPostsByUserUuid,
  getAuthenticatedFeedPosts,
  getFeedPosts,
  getPostByUuid,
};

// https://stackoverflow.com/questions/66834874/how-to-get-go-to-definition-for-typescript-on-vs-code
