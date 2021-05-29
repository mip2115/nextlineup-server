import mongoose from "mongoose";
import mysql from "mysql2/promise";

import UserSchema from "../../schemas/user";
import PostSchema from "../../schemas/post";
import ThoughtSchema from "../../schemas/thought";
import UpvoteSchema from "../../schemas/upvote";

export interface DatabaseConnection {
  connection: mysql.Connection;
}

const dbConnection = <DatabaseConnection>{};

const getMySQLConnection = async () => {
  return dbConnection;
};

const connectToMySQLDB = async () => {
  try {
    // create the connection to database
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "user",
      database: "nextlineup",
      password: "user",
    });
    console.log("connected to mysql");
    dbConnection.connection = connection;

    // const [results, fields] = await connection.query("SELECT * FROM t1;");
    // console.log("ROWS", results);
    // const values = Object.values(results);
    // console.log(values[0].name);
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/music-social-media", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

const getDbConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/music-social-media", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};

const closeDb = async () => {
  try {
    await mongoose.connection.close();
  } catch (e) {
    throw e;
  }
};

const dropAllCollections = async () => {
  try {
    await UserSchema.deleteMany({});
    await PostSchema.deleteMany({});
    await ThoughtSchema.deleteMany({});
    await UpvoteSchema.deleteMany({});
  } catch (e) {
    throw new Error(e.toString());
  }
};
export default {
  connectToDb,
  getDbConnection,
  dropAllCollections,
  closeDb,
  connectToMySQLDB,
  getMySQLConnection,
};
