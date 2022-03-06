const ACCESS_TOKEN_KEY = "access_token";

export const persistAccessToken = (token: string) => {
  try {
    // @TODO save token to local database or env
  } catch (error) {
    console.warn(error);
  }
};

export const getAccessToken = (): string | null => {
  try {
    // @TODO get token
  } catch (error) {
    console.warn(error);
  }
  return null;
};
