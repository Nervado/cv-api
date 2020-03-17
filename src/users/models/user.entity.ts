import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  // OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'UserTable' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  surname: string;

  @Column()
  cpf: string;

  @Column()
  phonenumber: string;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  housenumber: string;

  @Column()
  complement: string;

  @Column()
  neibehoord: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  cep: string;

  @Column()
  admin: boolean;

  @Column()
  ispro: boolean;

  @Column()
  password: string;

  @Column()
  salt: string;

  //@OneToMany(type => Task, task => task.user, { eager: true })
  //tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
