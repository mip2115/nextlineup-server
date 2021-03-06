import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import UserHandler from "./handlers/users";
import database from "./utils/database";
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// dbUtils.connectToDb();
const mySqlDb = database.getInstance();
mySqlDb.getDBConnection();

// const awsRoutes = require("./api/aws");
// const authRoutes = require("./api/auth");
// const userRoutes = require("./handlers/users");
// const postsRoutes = require("./api/posts");
// const thoughtRoutes = require("./api/thoughts");
// app.use("/api/aws", awsRoutes);
// app.use("/api/auth", authRoutes);
const userHandler = new UserHandler();
app.use("/api/users", userHandler.getRoutes());
// app.use("/api/posts", postsRoutes);
// app.use("/api/thoughts", thoughtRoutes);
// app.use("/handlers/users", UserRoutes);
// app.use("/handlers/posts", PostRoutes);
// app.use("/handlers/thoughts", ThoughtRoutes);

const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
