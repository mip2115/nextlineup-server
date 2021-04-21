import jwt from "jsonwebtoken";
const accessTokenSecret = "youraccesstokensecret";

const signJwtToken = async (uuid: string): Promise<string> => {
  const accessToken = await jwt.sign({ uuid: uuid }, accessTokenSecret);
  return accessToken;
};

const authenticateJWT = async (req: any, res: any, next: any) => {
  try {
    const authHeaderToken = req.headers.authorization;
    if (authHeaderToken) {
      const uuid = await jwt.verify(authHeaderToken, accessTokenSecret);
      req.uuid = uuid;
      next();
    } else {
      throw new Error("no auth header present");
    }
  } catch (e) {
    throw new Error(e.toString());
  }
};

export default {
  signJwtToken,
  authenticateJWT,
};
