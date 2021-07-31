import { PrimaryKey, Entity } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;
}
