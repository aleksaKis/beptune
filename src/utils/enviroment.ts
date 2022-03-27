import { decrypt, encrypt } from './encrypt';
import { showError } from '../cli';

export const persistToEnv = (value: string, key: string) => {
  try {
    process.env[key] = encrypt(value);
  } catch (error) {
    showError(error);
  }
};

export const getFromEnv = (key: string): string | undefined => {
  try {
    const token = process.env[key];
    return token ? decrypt(token) : undefined;
  } catch (error) {
    showError(error);
  }
  return undefined;
};
