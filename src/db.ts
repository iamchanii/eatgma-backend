import config from '../mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

let orm: MikroORM;

export const getMikroInstance = async () => {
  if (!orm) {
    orm = await MikroORM.init(config);
  }

  return orm;
};
