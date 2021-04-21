import express from "express";
import AuthUtils from "../../utils/auth";
import PostController from "../../controllers/posts";
import ThoughtController from "../../controllers/thoughts";
import ThoughtRepo from "../../schemas/thought/repo";
const router = express.Router();

router.post(
  "/create-thought",
  AuthUtils.authenticateJWT,
  async (req: any, res: any) => {
    try {
      const { postUuid, content, userUuid } = req.body;
      // get the post and extract the the userUuid
      // const post = await PostController.getPostByUuid(postUuid);

      // const userUuid = post.userUuid;
      // if (post.thoughts.length >= 2) {
      //   throw new Error("post already has two thoughts");
      // }
      const thoughtParams = {
        postUuid: postUuid,
        content: content,
        userUuid: userUuid,
      };

      const thought = await ThoughtController.createThought(thoughtParams);
      res.json({ msg: thought });
    } catch (e) {
      console.log(e);
      res.status(400).json({ err: e.toString() });
    }
  }
);

router.post("/get-thoughts-for-posts", async (req: any, res: any) => {
  try {
    const { postUuids } = req.body;
    const thoughts = await ThoughtController.getThoughtsForPosts(postUuids);
    res.json({ msg: thoughts });
  } catch (e) {
    throw e;
  }
});

export default router;
