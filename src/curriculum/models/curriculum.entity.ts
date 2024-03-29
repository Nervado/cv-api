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
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/models/user.entity';
import { Photo } from '../../photos/models/photos.entity';
import { Address } from '../../address/models/address.entity';

// import { BudgetStatus } from '../enums/budget-status.enum';

@Entity({ name: 'CurriculumTable' })
export class Curriculum extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  deepness: number;

  @Column({ nullable: true })
  numberOfRooms: number;

  @Column({ nullable: true })
  numberOflights: number;

  @Column({ nullable: true })
  numberOfWalls: number;

  @Column({ nullable: true })
  numberOfFloors: number;

  @Column({ nullable: true })
  numberOfDoors: number;

  @Column({ nullable: true })
  numberOfWindows: number;

  @Column()
  desirableTime: Date;

  @Column({ nullable: true })
  possibleTime: Date;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(
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
  photo: Photo[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  /**
   *   @Column({
    type: 'enum',
    enum: BudgetStatus,
    default: BudgetStatus.NEW,
  })
  status: BudgetStatus;
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
