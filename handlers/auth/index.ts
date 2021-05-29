import express from "express";
import url from "url";
import { getGoogleAuthURL, getGoogleUser } from "./google";
import UserController from "../../controllers/users";

const router = express.Router();

router.get("/authorize-google-sign-in/", async (req: any, res: any) => {
  try {
    var queryData = url.parse(req.url, true).query;
    const code = queryData.code as string;
    const googleUser: any = await getGoogleUser(code);
    // at this point the user is already signed in.  So
    // check to see if the user exists or account already is created
    // if user exists, return user/token because they are logged in.
    // othersise return user not logged in. Or some way to denote that.
    var user = UserController.getUserByEmail(googleUser.email);
    if (user === null) {
      // create new user
      user = await AuthUtils.createOathUser({
        email: googleUser.email,
        oath: "google",
      });
    }
    const jwtToken = await AuthUtils.signJwtToken(user.uuid);
    const response = {
      email: user.email,
      uuid: user.uuid,
      token: jwtToken,
    };

    res.json({ user: response });
  } catch (e) {
    res.status(400).json({ msg: e.toString() });
  }
});

// use this for both sign up and login
router.get("/handle-google-login/", async (req: any, res: any) => {
  try {
    const url = getGoogleAuthURL();
    res.json({ msg: url });
  } catch (e) {
    res.status(400).json({ msg: e.toString() });
  }
});

export default router;
