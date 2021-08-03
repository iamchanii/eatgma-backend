import { getMikroInstance } from '../db';
import { verifyToken } from '../models/User/lib/jwtUtils';
import { IUser } from './__generated';
import { EnvelopError } from '@envelop/core';
import type { MikroORM } from '@mikro-orm/core';
import { Request } from 'graphql-helix';
import { TokenExpiredError } from 'jsonwebtoken';

export interface OwnContext {
  orm: MikroORM;
  user: IUser | null;
}

export const createContext = async (ctx: {
  request: Request;
}): Promise<OwnContext> => {
  let user: OwnContext['user'] = null;
  const authorization: string = (ctx.request.headers as any)['authorization'];

  if (authorization) {
    const accessToken = authorization.split('Bearer ')[1];

    try {
      user = verifyToken(accessToken).payload as IUser;
    } catch (e) {
      if (e.name === TokenExpiredError.name) {
        throw new EnvelopError('액세스 토큰이 만료되었습니다.');
      } else {
        throw new Error('예기치 않은 오류가 발생했습니다.');
      }
    }
  }

  return {
    orm: await getMikroInstance(),
    user,
  };
};
