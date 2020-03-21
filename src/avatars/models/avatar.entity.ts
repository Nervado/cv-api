import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  // OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity({ name: 'AvatarTable' })
@Unique(['url'])
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  avatarId: number;

  @Column()
  url: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  userId: number;

  //@OneToMany(type => Task, task => task.user, { eager: true })
  //tasks: Task[];
}
