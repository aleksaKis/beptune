import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const key = randomBytes(32);
const iv = randomBytes(16);

export const encrypt = (message: string): string => {
  const cipher = createCipheriv('aes256', key, iv);
  return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
};

export const decrypt = (message: string): string => {
  const decipher = createDecipheriv('aes256', key, iv);
  return decipher.update(message, 'hex', 'utf8') + decipher.final('utf8');
};
