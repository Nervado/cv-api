import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  Put,
  Body,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { diskStorage } from 'multer';

import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../users/users.service';
import { configService } from '../services/config.service';
import { cryptoService } from '../crypto/crypto.service';
import { AvatarsService } from './avatars.service';
import { AvatarDto } from './dto/avatar.dto';

@Controller('avatars')
export class AvatarsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly avatarService: AvatarsService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: configService.getAvatarsPath(),
        filename: (req, file, cb) => {
          cryptoService.generateFileName(req, file, cb);
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file): Promise<AvatarDto> {
    const { filename, path } = file;
    return this.avatarService.create({ filename, path });
  }

  @Get(':avatarpath')
  @UseInterceptors(ClassSerializerInterceptor)
  dowloadAvatar(@Param('avatarpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads/avatars' });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  update(@Param('id') id, @Body() body: AvatarDto) {
    return this.avatarService.update(body, id);
  }
}
