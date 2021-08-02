import { getMikroInstance } from '../db';
import { verifyToken } from '../models/User/lib/jwtUtils';
import { IUser } from './__generated';
import type { MikroORM } from '@mikro-orm/core';
import { Request } from 'graphql-helix';

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
    user = verifyToken(accessToken).payload as IUser;
  }

  return {
    orm: await getMikroInstance(),
    user,
  };
};
