import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/models/user.entity';
import { Photo } from 'src/photos/models/photos.entity';

@Entity({ name: 'BudgetTable' })
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  height: number;

  @Column()
  widht: number;

  @Column()
  depth: number;

  @Column()
  numberOfLors: number;

  @Column()
  desirableTime: number;

  @OneToOne(
    () => User,
    user => user.budget,
  )
  @JoinColumn()
  user: User;

  @OneToMany(
    () => Photo,
    photo => photo.budget,
  )
  @JoinColumn()
  photo: Photo;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
