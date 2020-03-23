import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
} from 'typeorm';
import { configService } from 'src/services/config.service';
import { Exclude } from 'class-transformer';

@Entity({ name: 'AvatarTable' })
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  avatarId: number;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  url: string;

  @AfterLoad()
  setComputed() {
    this.url = `${configService.getServerUrl()}/avatars/${this.filename}`;
  }
}
