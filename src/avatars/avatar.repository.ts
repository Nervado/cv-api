import { Repository, EntityRepository } from 'typeorm';

import { Avatar } from './models/avatar.entity';
import { AvatarDto } from './dto/avatar.dto';

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar> {
  async createOne(avatarDto: AvatarDto): Promise<AvatarDto> {
    const { filename, path } = avatarDto;

    const avatar = new Avatar();

    avatar.filename = filename;
    avatar.path = path;

    const { avatarId } = await avatar.save();

    const url = await avatar.getUrl();

    return { avatarId, url, filename };
  }
}
