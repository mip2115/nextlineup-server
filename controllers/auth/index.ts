// import UserRepo from "../../schemas/user/repo";
import UserRepo from "../../repo/users";
import bcrypt from "bcrypt";
import { getGoogleAuthURL } from "./google";
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

const createOathUser = async (params: any): Promise<any> => {
  try {
    const newUserParams: any = {
      email: params.email,
      uuid: uuidv4(),
      oath: params.oath,
    };
    const newUser = await UserRepo.createUser(newUserParams);
    return newUser;
  } catch (e) {
    throw e;
  }
};

const createUser = async (params: any): Promise<typeof User> => {
  try {
    // const url = getGoogleAuthURL();
    // console.log("URL IS");
    // console.log(url);
    // validateCreateUserParams(params);
    // you want to do something like params.oath
    const { email, password } = params;
    const existingUser = await UserRepo.getUserByEmail(email);
    if (existingUser) {
      throw new Error("email already exists");
    }
    const newUserParams: any = {
      email: email,
      uuid: uuidv4(),
      hashedPassword = await bcrypt.hash(password, saltRounds),
    };
    if (newUserParams.mobile !== null) {
      newUserParams.mobile = params.mobile;
    }
    const newUser = await UserRepo.createUser(newUserParams);
    return newUser;
  } catch (e) {
    throw e;
  }
};

const loginUser = async (params: LoginUserParams): Promise<any> => {
  try {
    const { email, password } = params;
    const user = await UserRepo.getUserByEmail(email);
    if (user === null) {
      throw new Error("could not find user");
    }
    if (password === null && user.oauth === null) {
      throw new Error("password is needed for non-auth user");
    }
    const match = await UserRepo.checkUserPassword(email, password);
    if (!match) {
      throw new Error("invalid password");
    }

    return user;
  } catch (e) {
    throw e;
  }
};

export default {
  loginUser,
  createUser,
  createOathUser,
};
