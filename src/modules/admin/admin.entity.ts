import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { TypeAdmin } from './enum/type-admin.enum';
import * as bcrypt from 'bcrypt';

@Entity('Admin')
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id_admin: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  addresss: string;

  @Column({ nullable: true })
  avatar_admin: string;

  @Column()
  type_admin: TypeAdmin;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
  }
}
