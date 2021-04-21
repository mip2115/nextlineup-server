// const express = require("express");
// const router = express.Router();
import UserRepo from "../../schemas/user/repo";
import { CreateUserParams } from "../../types/user/";

const getUserByUuid = async (uuid: string): Promise<any> => {
  try {
    const user = await UserRepo.getUserByUuid(uuid);
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

const validateUpdateUserParams = (params: any): any => {
  return params;
};

const updateUser = async (params: any): Promise<any> => {
  try {
    const user = await UserRepo.updateUser(params);
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteUser = async (params: any): Promise<any> => {
  try {
    const user = await UserRepo.deleteUser(params);
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  getUserByUuid,
};
