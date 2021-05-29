import dbUtils from "../../utils/db";
import {
  CreateUserParams,
  LoginUserParams,
  UserEntity,
  UserRecord,
} from "../../types/user";
import DatabaseConnection from "../../utils/database";
import bcrypt from "bcrypt";

class UserRepo {
  public dbConnection: DatabaseConnection;

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance();
  }

  createUser = async (params: any): Promise<UserRecord> => {
    try {
      const db = await this.dbConnection.getDBConnection();
      const insertUserToTable = `insert into user (
            email,
            mobile,
            uuid,
            hashedPassword
        ) VALUES(?, ?, ?, ?)`;
      const [results, _] = await db.query(insertUserToTable, [
        params.email,
        params.mobile,
        params.uuid,
        params.hashedPassword,
      ]);
      const values: Array<UserRecord> = Object.values(results);
      if (values.length == 0) {
        throw new Error("could not find any user");
      }
      return values[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  checkUserPassword = async (
    email: string,
    password: string
  ): Promise<boolean | null> => {
    try {
      const user = await this.getUserByEmail(email);
      if (user === null) {
        throw new Error("could not find user");
      }

      const match = await bcrypt.compare(
        password,
        user.hashedPassword as string
      );
      return match;
    } catch (e) {
      throw e;
    }
  };

  getUserByUuid = async (uuid: string): Promise<UserRecord | null> => {
    try {
      const db = await this.dbConnection.getDBConnection();
      const [
        results,
        _,
      ] = await db.query("SELECT * FROM user where uuid = ? limit 1", [uuid]);
      const values: Array<UserRecord> = Object.values(results);
      if (values.length == 0) {
        return null;
      }
      return values[0];
    } catch (e) {
      throw e;
    }
  };

  getUserByEmail = async (email: string): Promise<UserRecord | null> => {
    try {
      const db = await this.dbConnection.getDBConnection();
      const [
        results,
        _,
      ] = await db.query("SELECT * FROM user where email = ? limit 1", [email]);
      const values: Array<UserRecord> = Object.values(results);
      if (values.length == 0) {
        return null;
      }
      return values[0];
    } catch (e) {
      throw e;
    }
  };
}

export default UserRepo;
