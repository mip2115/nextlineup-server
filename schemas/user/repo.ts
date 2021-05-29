// import UserRepo from "./index.js";
const UserSchema = require("./index.js");
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "../../types/user";
import bcrypt from "bcrypt";

const fromRepoUserToEntityUser = (user: any): any => {
  // const userEntity: UserEntity = {
  //   email: user.email,
  //   uuid: user.uuid,
  //   mobile: user.mobile,
  //   createdAt: user.createdAt,
  //   updatedAt: user.updatedAt,
  //   username: user.deletedAt,
  //   deletedAt: user.deletedAt,
  // };
  // return userEntity;
  return {};
};

const checkUserPassword = async (
  email: string,
  password: string
): Promise<boolean | null> => {
  try {
    const user = await UserSchema.findOne({ email: email });
    if (user === null) {
      return null;
    }
    const match = await bcrypt.compare(password, user.password);
    return match;
  } catch (e) {
    throw e;
  }
};

const getUserByUuid = async (uuid: string): Promise<UserEntity> => {
  try {
    const user = await UserSchema.findOne({ uuid: uuid });
    const userEntity = fromRepoUserToEntityUser(user);
    return userEntity;
  } catch (e) {
    throw e;
  }
};

const getUserByEmail = async (email: string): Promise<UserEntity | null> => {
  try {
    const user = await UserSchema.findOne({ email: email });
    if (user === null) {
      return null;
    }
    // user is returning null here
    const userEntity = fromRepoUserToEntityUser(user);
    return userEntity;
  } catch (e) {
    throw new Error(e);
  }
};

const createUser = async (userParams: any): Promise<UserEntity> => {
  try {
    const user = new UserSchema(userParams);

    await user.save();
    const userEntity = fromRepoUserToEntityUser(userParams);
    return userEntity;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (uuid: string): Promise<UserEntity> => {
  try {
    const user = await UserSchema.find({ uuid: uuid });
    const userEntity = fromRepoUserToEntityUser(user);
    return userEntity;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteUser = async (uuid: string): Promise<UserEntity> => {
  try {
    const user = await UserSchema.find({ uuid: uuid });
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  getUserByUuid,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  checkUserPassword,
};
