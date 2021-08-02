import { IUser } from '../../../graphql/__generated';
import { Jwt, sign, verify } from 'jsonwebtoken';

// TODO: 환경 변수로 관리
const SECRET = '$$$$uper$$$$exy';
const ISSUER = 'eatgma';

export const createRefreshToken = (): string => {
  return sign({}, SECRET, { expiresIn: '14d', issuer: ISSUER });
};

export const createAccessToken = (userNode: IUser): string => {
  return sign(userNode, SECRET, { expiresIn: '1h', issuer: ISSUER });
};

export const verifyToken = (token: string): Jwt => {
  return verify(token, SECRET, { issuer: ISSUER, complete: true }) as Jwt;
};
