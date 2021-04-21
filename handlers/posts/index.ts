import express from "express";
import PostController from "../../controllers/posts";
import { CreatePostParams } from "../../types/post";
import AuthUtils from "../../utils/auth";

const router = express.Router();

router.post(
  "/create-post",
  AuthUtils.authenticateJWT,
  async (req: any, res: any) => {
    try {
      const { userUuid, title, fileAsBase64 } = req.body;
      const s3Params: CreatePostParams = {
        userUuid: userUuid,
        title: title,
        fileAsBase64: fileAsBase64,
      };
      const post = await PostController.createPost(s3Params);
      res.json({ msg: post });
    } catch (e) {
      console.log(e);
      res.status(400).json({ err: e.toString() });
    }
  }
);

router.get("/get-post-by-uuid/:postUuid", async (req: any, res: any) => {
  try {
    const { postUuid } = req.params;
    const post = await PostController.getPostByUuid(postUuid);
    res.json({ msg: post });
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: e.toString() });
  }
});
//
router.post("/upvote-post", async (req: any, res: any) => {
  try {
    await PostController.upvotePost(req.body.userUuid, req.body.postUuid);
    res.json({ msg: "success" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: e.toString() });
  }
});

router.get("/get-feed-posts/:page", async (req: any, res: any) => {
  try {
    const { page } = req.params;
    const posts = await PostController.getFeedPosts(page);
    res.json({ msg: posts });
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: e.toString() });
  }
});

export default router;
