import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } from "../secure/spotify";
import qs from "qs";
import axios from "axios";
import { getAccessToken, persistAccessToken } from "./utils";
import { showError } from "../cli";

const token_url = "https://accounts.spotify.com/api/token";
const buffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const data = qs.stringify({ grant_type: GRANT_TYPE });

const requestAccessToken = async () => {
  try {
    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${buffer}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    showError(error);
  }
};

/* Tries to get access token when fails makes request for new and saves it  */
export const gainAccessToken = async (): Promise<string> => {
  const token = getAccessToken();
  if (!token) {
    const newToken = await requestAccessToken();
    !!newToken && persistAccessToken(newToken);
    return newToken || "";
  }
  return token;
};
