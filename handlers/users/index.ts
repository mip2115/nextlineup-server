import express from "express";
// import { authenticateJWT, signJwtToken } from "../../utils/auth";
import AuthUtils from "../../utils/auth";

import UserController from "../../controllers/users";
import AuthController from "../../controllers/auth";
const router = express.Router();

router.get(
  "/get-user-by-uuid/:uuid",
  //  AuthUtils.AuthenticateJWT,
  async (req: any, res: any): Promise<any> => {
    const { uuid } = req.params;
    try {
      const user = await UserController.getUserByUuid(uuid);
      res.json({ success: user });
    } catch (e) {
      res.status(400).json({ msg: e.toString() });
    }
  }
);

router.post(
  "/login-user",
  async (req: any, res: any): Promise<any> => {
    try {
      const user = await AuthController.loginUser(req.body);
      const jwtToken = await AuthUtils.signJwtToken(user.uuid);
      const response = {
        email: user.email,
        uuid: user.uuid,
        token: jwtToken,
      };
      res.json({ user: response });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.toString() });
    }
  }
);

router.post(
  "/create-user",
  async (req: any, res: any): Promise<any> => {
    try {
      const user = await AuthController.signupUser(req.body);
      // const jwtToken = await AuthUtils.signJwtToken(user._id);
      // res.set("authorized-header", jwtToken);
      res.json({ user: user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.toString() });
    }
  }
);

router.get(
  "/test-endpoint",
  AuthUtils.authenticateJWT,
  (req: any, res: any): any => {
    try {
      res.json({ msg: "reached test endpoint" });
    } catch (e) {
      res.status(400).json({ err: e.toString() });
    }
  }
);

export default router;
