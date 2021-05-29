import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRoutes from "./handlers/users";
import AuthRoutes from "./handlers/auth";
import PostRoutes from "./handlers/posts/";
import ThoughtRoutes from "./handlers/thoughts/";
import dbUtils from "./utils/db";
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
dbUtils.connectToMySQLDB();

// const awsRoutes = require("./api/aws");
// const authRoutes = require("./api/auth");
// const userRoutes = require("./handlers/users");
// const postsRoutes = require("./api/posts");
// const thoughtRoutes = require("./api/thoughts");
// app.use("/api/aws", awsRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/thoughts", thoughtRoutes);
// app.use("/handlers/users", UserRoutes);
// app.use("/handlers/posts", PostRoutes);
// app.use("/handlers/thoughts", ThoughtRoutes);

const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
