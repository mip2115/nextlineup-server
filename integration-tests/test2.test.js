import axios from "axios";
import fs from "fs";
import path from "path";
const mongoose = require("mongoose");
import dbUtils from "../utils/db";
import PostSchema from "../schemas/post";
import ThoughtSchema from "../schemas/thought";
import UpvoteSchema from "../schemas/upvote";

describe("functionality suite 2", () => {
  beforeAll(async () => {
    await dbUtils.connectToDb();
  });
  afterAll(async () => {
    await dbUtils.closeDb();
  });
  beforeEach(async () => {
    await dbUtils.dropAllCollections();
  });

  it("test getting a post with upvotes", async () => {
    try {
      const resp = createAndLoginUser();

      const post = new PostSchema({
        uuid: "post-uuid-1",
        userUuid: "some-user",
        title: "test post",
        linkToMedia: "link",
        storageKey: "storageKey",
      });
      await post.save();

      let body = {
        userUuid: "some-user",
        postUuid: "post-uuid-1",
      };
      let config = {
        headers: {
          authorization: resp.token,
        },
      };

      let response = await axios.post(
        "http://localhost:5000/handlers/posts/upvote-post",
        body,
        config
      );
      expect(response.data.msg).toEqual("success");

      body.userUuid = "another-user";
      response = await axios.post(
        "http://localhost:5000/handlers/posts/upvote-post",
        body,
        config
      );
      expect(response.data.msg).toEqual("success");

      response = await axios.get(
        `http://localhost:5000/handlers/posts/get-post-by-uuid/${body.postUuid}`
      );
      expect(response.data.msg.upvotes.length).toEqual(2);

      response = await axios.post(
        "http://localhost:5000/handlers/posts/upvote-post",
        body,
        config
      );
      expect(response.data.msg).toEqual("success");

      response = await axios.get(
        `http://localhost:5000/handlers/posts/get-post-by-uuid/${body.postUuid}`
      );
      expect(response.data.msg.upvotes.length).toEqual(1);
    } catch (e) {
      console.log(e);
      expect(false).toBeTruthy();
    }
  });
});

const createAndLoginUser = async () => {
  try {
    let body = {
      email: "email1@email.com",
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
      email: "email1@email.com",
      password: "123",
    };
    response = await axios.post(
      "http://localhost:5000/handlers/users/login-user",
      body
    );
    expect(response.data.user.email).toEqual(body.email);

    return {
      user: response.data.user,
      token: response.data.user.token,
    };
  } catch (e) {
    throw e;
  }
};
