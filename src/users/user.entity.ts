import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserTable' })
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  houseNumber: string;

  @Column()
  neibehoord: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  admin: boolean;

  @Column()
  isPro: boolean;
}

export default UserEntity;
