const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
  deletedAt: {
    type: String,
  },
  updatedAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/

/*
password <> hash='$2b$05$.uDGQ/ZdcGS3xanlEhxXjeMjw05GxMY0wwCp5EAVSEB2V/6KPao52';
	"_id" : "5ff2104a3dac6b57bc03ac89",
	"email" : "testuser1@gmail.com",
	"password" : "$2b$05$.uDGQ/ZdcGS3xanlEhxXjeMjw05GxMY0wwCp5EAVSEB2V/6KPao52",
	"username" : "skyrocket-1"
 */
