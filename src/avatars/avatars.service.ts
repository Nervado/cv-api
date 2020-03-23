import { Injectable } from '@nestjs/common';
import { AvatarRepository } from './avatar.repository';
import { AvatarDto } from './dto/avatar.dto';

@Injectable()
export class AvatarsService {
  constructor(private readonly avatarsRepo: AvatarRepository) {}

  async create(avatarDto: AvatarDto): Promise<AvatarDto> {
    const avatar = await this.avatarsRepo.createOne(avatarDto);
    return avatar;
  }

  async update(avatarDto: AvatarDto, id?: number): Promise<AvatarDto> {
    const find = await this.avatarsRepo.findOne(id);
    if (!find) {
      find.filename = avatarDto.filename;
      // To Do .. file put clear old file taks on queue
      find.path = avatarDto.path;

      console.log('Atualizando novo avatar...');
      return await find.save();
    }
    return await this.avatarsRepo.createOne(avatarDto);
  }
}
