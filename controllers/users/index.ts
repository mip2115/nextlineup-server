import { CreateUserParams, UserRecord } from "../../types/user/";
import UserRepo from "../../repo/users";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const saltRounds = 5;

class UserController {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }
  createUser = async (params: any): Promise<UserRecord | null> => {
    try {
      // validate the user params.
      const { email, password } = params;
      const existingUser = await this.userRepo.getUserByEmail(email);
      if (existingUser) {
        throw new Error("user with email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUserParams: any = {
        email: email,
        uuid: uuidv4(),
        hashedPassword: hashedPassword,
      };
      if (params.mobile !== null) {
        newUserParams.mobile = params.mobile;
      }
      const user = await this.userRepo.createUser(newUserParams);
      return user;
    } catch (e) {
      throw e;
    }
  };

  loginUser = async (params: any): Promise<UserRecord> => {
    try {
      // validate email and password
      const user = await this.userRepo.checkUserPassword(
        params.email,
        params.password
      );
      return user;
    } catch (e) {
      throw e;
    }
  };

  getUserByUuid = async (uuid: string): Promise<UserRecord | null> => {
    try {
      const user = await this.userRepo.getUserByUuid(uuid);
      return user;
    } catch (e) {
      throw e;
    }
  };

  getUserByEmail = async (email: string): Promise<UserRecord | null> => {
    try {
      const userByEmail = await this.userRepo.getUserByEmail(email);
      return userByEmail;
    } catch (e) {
      throw e;
    }
  };
}

export default UserController;
