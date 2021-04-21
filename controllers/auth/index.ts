import UserRepo from "../../schemas/user/repo";
import bcrypt from "bcrypt";
import {
  CreateUserParams,
  LoginUserParams,
  UserEntity,
} from "../../types/user";
import { v4 as uuidv4 } from "uuid";
const User = require("../../schemas/user");
const saltRounds = 5;

const validateCreateUserParams = (params: CreateUserParams): boolean => {
  try {
    if (
      params.email === undefined ||
      params.email === "" ||
      params.email === null
    ) {
      throw new Error("email is required");
    }
    if (
      params.password === undefined ||
      params.password === "" ||
      params.password === null
    ) {
      throw new Error("password is required");
    }
    if (params.password !== params.passwordConfirm) {
      throw new Error("passwords not the same");
    }
  } catch (e) {
    throw e;
  }
  return true;
};

const signupUser = async (params: CreateUserParams): Promise<typeof User> => {
  try {
    validateCreateUserParams(params);
    const { email, password } = params;
    const existingUser = await UserRepo.getUserByEmail(email);
    if (existingUser) {
      throw new Error("email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserParams = {
      email: email,
      password: hashedPassword,
      uuid: uuidv4(),
    };
    const newUser = await UserRepo.createUser(newUserParams);
    return newUser;
  } catch (e) {
    throw e;
  }
};

const loginUser = async (params: LoginUserParams): Promise<any> => {
  try {
    const { email, password } = params;
    const match = await UserRepo.checkUserPassword(email, password);
    if (!match) {
      throw new Error("invalid password");
    }
    const user = await UserRepo.getUserByEmail(email);
    return user;
  } catch (e) {
    throw e;
  }
};

export default {
  loginUser,
  signupUser,
};
