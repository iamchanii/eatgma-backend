import { compareSync, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const encryptPassword = (source: string): string => {
  return hashSync(source, SALT_ROUNDS);
};

export const comparePassword = (source: string, encrypted: string): boolean => {
  return compareSync(source, encrypted);
};
