import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Avatar } from '../../avatars/models/avatar.entity';
import { Exclude, Expose } from 'class-transformer';

import * as bcrypt from 'bcrypt';
import { Budget } from 'src/budgets/models/budget.entity';

@Entity({ name: 'UserTable' })
@Unique(['email'])
@Unique(['cpf'])
@Unique(['phonenumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  housenumber: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  neibehoord: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  uf: string;

  @Column({ nullable: true })
  cep: string;

  @Column()
  admin: boolean;

  @Column()
  ispro: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToOne(() => Avatar, { eager: true })
  @JoinColumn()
  avatar: Avatar;

  @OneToMany(
    () => Budget,
    budget => budget.user,
  )
  @JoinColumn()
  budget: Budget;

  @Expose()
  get fullname() {
    return this.username + ' ' + this.surname;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
