import { Migration } from '@mikro-orm/migrations';

export class Migration20210802125627 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "email" varchar(255) not null, add column "password" varchar(255) not null;'
    );
  }
}
