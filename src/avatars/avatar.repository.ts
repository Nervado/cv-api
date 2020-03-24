import { Repository, EntityRepository } from 'typeorm';

import { Avatar } from './models/avatar.entity';
import { AvatarDto } from './dto/avatar.dto';

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar> {
  async createOne(avatarDto: AvatarDto): Promise<AvatarDto> {
    const avatar = new Avatar();
    this.merge(avatar, avatarDto);
    return avatar.save();
  }
}
