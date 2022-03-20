import { decrypt, encrypt } from './encrypt';

export const persistToEnv = (value: string, key: string) => {
  try {
    process.env[key] = encrypt(value);
  } catch (error) {
    console.warn(error);
  }
};

export const getFromEnv = (key: string): string | undefined => {
  try {
    const token = process.env[key];
    return token ? decrypt(token) : undefined;
  } catch (error) {
    console.warn(error);
  }
  return undefined;
};
