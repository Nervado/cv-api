import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { configService } from 'src/services/config.service';

@Entity({ name: 'AvatarTable' })
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  avatarId: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  getUrl(): string {
    return `${configService.getServerUrl()}/avatars/${this.filename}`;
  }
}
