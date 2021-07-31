import { getMikroInstance } from '../db';
import type { MikroORM } from '@mikro-orm/core';

export interface OwnContext {
  orm: MikroORM;
}

export const createContext = async (): Promise<OwnContext> => {
  return {
    orm: await getMikroInstance(),
  };
};
