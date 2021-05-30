import express from "express";
// import { authenticateJWT, signJwtToken } from "../../utils/auth";
import AuthUtils from "../../utils/auth";
import UserController from "../../controllers/users";
import AuthController from "../../controllers/auth";

class UserHandler {
  private userController: UserController;
  private router: express.Router;
  constructor() {
    this.userController = new UserController();
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    // public routes
    this.router.get("/get-user-by-uuid/:uuid", this.getUserByUuid);
    this.router.post("/login-user", this.loginUser);
    this.router.post("/create-user", this.createUser);

    // private routes
    this.router.get("/test-auth", AuthUtils.authenticateJWT, this.testAuth);
  };

  getRoutes = () => {
    return this.router;
  };

  getUserByUuid = async (req: any, res: any) => {
    try {
      const { uuid } = req.params;
      const user = await this.userController.getUserByUuid(uuid);
      res.json({ success: user });
    } catch (e) {
      res.status(400).json({ msg: e.toString() });
    }
  };

  testAuth = async (req: any, res: any) => {
    try {
      res.json({ success: "true" });
    } catch (e) {
      res.status(400).json({ msg: e.toString() });
    }
  };

  loginUser = async (req: any, res: any) => {
    try {
      const user = await this.userController.loginUser(req.body);
      const jwtToken = await AuthUtils.signJwtToken(user.uuid);
      const response = {
        user: user,
        token: jwtToken,
      };
      res.json({ user: response });
    } catch (e) {
      res.status(400).json({ msg: e.toString() });
    }
  };

  createUser = async (req: any, res: any) => {
    try {
      const user = await this.userController.createUser(req.body);
      res.json({ user: user });
    } catch (e) {
      res.status(400).json({ msg: e.toString() });
    }
  };
}

export default UserHandler;
