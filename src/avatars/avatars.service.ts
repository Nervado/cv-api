import { Injectable } from '@nestjs/common';
import { AvatarRepository } from './avatar.repository';
import { AvatarDto } from './dto/avatar.dto';

@Injectable()
export class AvatarsService {
  constructor(private avatarsRepo: AvatarRepository) {}

  async create(avatarDto: AvatarDto): Promise<AvatarDto> {
    return this.avatarsRepo.createOne(avatarDto);
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
