import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } from '../secure/spotify';
import qs from 'qs';
import axios from 'axios';
import { ERROR_MESSAGES, showError } from '../cli';
import { getFromEnv, persistToEnv } from '../utils/environment';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

const buffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const data = qs.stringify({ grant_type: GRANT_TYPE });

const fetchAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(TOKEN_URL, data, {
      headers: {
        Authorization: `Basic ${buffer}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    showError(error || ERROR_MESSAGES.UNAUTHORIZED);
    throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
  }
};

/* Tries to get access token, when fails makes request for new and saves it  */
export const getAccessToken = async (): Promise<string> => {
  const token = getFromEnv(ACCESS_TOKEN_KEY);
  if (token) {
    return token;
  }
  const newToken = await fetchAccessToken();
  persistToEnv(newToken, ACCESS_TOKEN_KEY);
  return newToken;
};
