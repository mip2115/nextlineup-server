import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();

const deleteFromS3 = async (key: string): Promise<boolean> => {
  try {
    const params = {
      Bucket: "comedy-bucket",
      Key: key,
    };
    const data = await s3.deleteObject(params).promise();
    return !!data;
  } catch (e) {
    throw new Error(e.toString());
  }
};

const getDataFromS3 = async (key: any): Promise<any> => {
  try {
    const params = {
      Key: key,
      Bucket: "comedy-bucket",
    };

    const data = await s3.getObject(params).promise();
    return data;
  } catch (e) {
    throw new Error(e.toString());
  }
};

const uploadImageToS3 = async (uploadImageParams: any): Promise<any> => {
  try {
    const s3Params = {
      Bucket: "comedy-bucket",
      Key: uploadImageParams.key,
      ContentType: "jpeg", // must have a content type
      ACL: "public-read",
      Body: uploadImageParams.file,
      ContentEncoding: "base64",
    };
    const data = await s3.putObject(s3Params).promise();
    const s3UploadResult = {
      storageKey: s3Params.Key,
      linkToMedia: "some-link",
    };
    return s3UploadResult;
  } catch (e) {
    throw new Error(e.toString());
  }
};

export default {
  uploadImageToS3,
  deleteFromS3,
};
