import { google } from "googleapis";
import axios from "axios";

const oauth2Client = new google.auth.OAuth2(
  "217332712098-en2m4k3cm8pv339e9nllner88rqa12je.apps.googleusercontent.com",
  "b64YIleLHmLVNPmJkkDGsnJT",
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  "http://localhost:5000/api/auth/authorize-google-sign-in/"
);

export const getGoogleAuthURL = () => {
  /*
   * Generate a url that asks permissions to the user's email and profile
   */
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes, // If you only need one scope you can pass it as string
  });
};

export const getGoogleUser = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log("TOKENS: ", tokens);
  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
};
