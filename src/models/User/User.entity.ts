import { IUser } from '../../graphql/__generated';
import { BaseEntity } from '../Common/Common.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity<IUser> {
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ default: '' })
  refreshToken?: string;

  toNode(): IUser {
    return {
      id: this.id.toString(),
      __typename: 'User',
      email: this.email,
    };
  }
}
