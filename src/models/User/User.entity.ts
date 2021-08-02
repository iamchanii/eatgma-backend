import { BaseEntity } from '../Common/Common.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity {
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ default: '' })
  refreshToken!: string;
}
