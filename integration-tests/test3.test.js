import axios from "axios";
import fs from "fs";
import path from "path";
const mongoose = require("mongoose");
import dbUtils from "../utils/db";
import PostSchema from "../schemas/post";
import ThoughtSchema from "../schemas/thought";
import UpvoteSchema from "../schemas/upvote";

describe("create user", () => {
  beforeAll(async () => {
    await dbUtils.connectToDb();
  });
  afterAll(async () => {
    await dbUtils.closeDb();
  });
  beforeEach(async () => {
    await dbUtils.dropAllCollections();
  });

  it("test create user works", async () => {
    try {
      const body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);
      response = await axios.get(
        `http://localhost:5000/handlers/users/get-user-by-uuid/${response.data.user.uuid}`
      );
      expect(response.data.success.email).toEqual(body.email);
    } catch (e) {
      console.log("ERROR: ", e);
      expect(false).toBeTruthy();
    }
  });

  it("test create user works and endpointt", async () => {
    try {
      let body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      response = await axios.get(
        `http://localhost:5000/handlers/users/get-user-by-uuid/${response.data.user.uuid}`
      );
      expect(response.data.success.email).toEqual(body.email);

      body = {
        email: "email@email.com",
        password: "123",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/users/login-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);
      let config = {
        headers: {
          authorization: response.data.user.token,
        },
      };
      response = await axios.get(
        `http://localhost:5000/handlers/users/test-endpoint`,
        config
      );
    } catch (e) {
      console.log("ERROR: ", e);
      expect(false).toBeTruthy();
    }
  });

  it("create a post with aws", async () => {
    try {
      let body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      body = {
        email: "email@email.com",
        password: "123",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/users/login-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      const filePath = path.join(__dirname, "audio_base_64.txt");
      const fileAsBase64 = fs.readFileSync(filePath, "utf8");
      body = {
        userUuid: response.data.user.uuid,
        title: "testing create post",
        fileAsBase64: fileAsBase64,
      };

      let config = {
        headers: {
          authorization: response.data.user.token,
        },
      };
      response = await axios.post(
        "http://localhost:5000/handlers/posts/create-post",
        body,
        config
      );
      expect(response.data.msg.title).toEqual(body.title);

      response = await axios.get(
        `http://localhost:5000/handlers/posts/get-post-by-uuid/${response.data.msg.uuid}`
      );
      expect(response.data.msg.title).toEqual(body.title);
    } catch (e) {
      console.log("ERROR: ", e);
      expect(false).toBeTruthy();
    }
  });

  it("get feed posts", async () => {
    try {
      for (let i = 0; i < 10; i++) {
        const post = new PostSchema({
          uuid: i,
          userUuid: "a",
          title: "post " + i,
          linkToMedia: "link",
          storageKey: "storageKey",
          upvotes: i * 10 + 5,
        });
        await post.save();
      }

      const thought = new ThoughtSchema({
        uuid: 10,
        userUuid: "a",
        content: " some content ",
        postUuid: 1,
      });
      await thought.save();

      const thought2 = new ThoughtSchema({
        uuid: 11,
        userUuid: "a",
        content: " some content ",
        postUuid: 1,
      });
      await thought2.save();

      const thought3 = new ThoughtSchema({
        uuid: 12,
        userUuid: "a",
        content: " some content ",
        postUuid: 2,
      });
      await thought3.save();

      const response = await axios.get(
        `http://localhost:5000/handlers/posts/get-feed-posts/0`
      );
    } catch (e) {
      console.log(e);
      expect(false).toBeTruthy();
    }
  });

  it("create thought for post", async () => {
    try {
      let body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      body = {
        email: "email@email.com",
        password: "123",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/users/login-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      const post = new PostSchema({
        uuid: "post-uuid",
        userUuid: response.data.user.uuid,
        title: "test post",
        linkToMedia: "link",
        storageKey: "storageKey",
        upvotes: 1,
      });
      await post.save();
    } catch (e) {
      console.log(e);
      expect(false).toBeTruthy();
    }
  });

  it("get thoughts for posts", async () => {
    try {
      const thought = new ThoughtSchema({
        uuid: "thought-uuid",
        userUuid: "user-uuid",
        postUuid: "post-uuid",
        content: "some comment",
      });
      await thought.save();

      const body = {
        postUuids: ["post-uuid"],
      };
      const response = await axios.post(
        "http://localhost:5000/handlers/thoughts/get-thoughts-for-posts",
        body
      );
      expect(response.data.msg[0].content).toEqual("some comment");
    } catch (e) {
      console.log(e);
      expect(false).toBeTruthy();
    }
  });

  it("create thoughts for  posts", async () => {
    try {
      let body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      body = {
        email: "email@email.com",
        password: "123",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/users/login-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      const post = new PostSchema({
        uuid: "post-uuid",
        userUuid: "some-user",
        title: "test post",
        linkToMedia: "link",
        storageKey: "storageKey",
        upvotes: 1,
      });
      await post.save();

      body = {
        userUuid: "some-user",
        postUuid: "post-uuid",
        content: "some-content",
      };
      let config = {
        headers: {
          authorization: response.data.user.token,
        },
      };
      response = await axios.post(
        "http://localhost:5000/handlers/thoughts/create-thought",
        body,
        config
      );
      expect(response.data.msg.content).toEqual(body.content);

      await expect(async () => {
        response = await axios.post(
          "http://localhost:5000/handlers/thoughts/create-thought",
          body,
          config
        );
      }).rejects.toThrow();

      body.userUuid = "another-user";
      response = await axios.post(
        "http://localhost:5000/handlers/thoughts/create-thought",
        body,
        config
      );
      expect(response.data.msg.content).toEqual(body.content);

      response = await axios.get(
        `http://localhost:5000/handlers/posts/get-post-by-uuid/${body.postUuid}`
      );
      expect(response.data.msg.thoughts.length).toEqual(2);

      await expect(
        async () =>
          (response = await axios.post(
            "http://localhost:5000/handlers/thoughts/create-thought",
            body,
            config
          ))
      ).rejects.toThrow();

      // response = await axios.post(
      //   "http://localhost:5000/handlers/thoughts/create-thought",
      //   body,
      //   config
      // );
      // expect(response.data.msg.content).toEqual(body.content);
      // issue with this test is that getPostByUUID isn't getting the thoguhts associated.
      // expect(response.data.msg[0].content).toEqual("some comment");
    } catch (e) {
      console.log(e);
      expect(false).toBeTruthy();
    }
  });
  it("upvote post", async () => {
    try {
      let body = {
        email: "email@email.com",
        password: "123",
        passwordConfirm: "123",
        mobile: "123",
      };
      let response = await axios.post(
        "http://localhost:5000/handlers/users/create-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      body = {
        email: "email@email.com",
        password: "123",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/users/login-user",
        body
      );
      expect(response.data.user.email).toEqual(body.email);

      const post = new PostSchema({
        uuid: "post-uuid",
        userUuid: "some-user",
        title: "test post",
        linkToMedia: "link",
        storageKey: "storageKey",
        upvotes: 1,
      });
      await post.save();

      body = {
        userUuid: "another-user",
        postUuid: "post-uuid",
      };
      response = await axios.post(
        "http://localhost:5000/handlers/posts/upvote-post",
        body
      );
      expect(response.data.msg).toEqual("success");
      let upvote = await UpvoteSchema.findOne({
        postUuid: body.postUuid,
        userUuid: body.userUuid,
      });
      expect(upvote).toBeTruthy();

      response = await axios.post(
        "http://localhost:5000/handlers/posts/upvote-post",
        body
      );
      expect(response.data.msg).toEqual("success");
      upvote = await UpvoteSchema.findOne({
        postUuid: body.postUuid,
        userUuid: body.userUuid,
      });
      expect(upvote).toBeFalsy();
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
});

//  https://mongoplayground.net/p/G2oynDBTrQW
