import { Repository, EntityRepository } from 'typeorm';
/*
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
*/
// import * as bcrypt from 'bcrypt';
import { Avatar } from './models/avatar.entity';

// import { PageFilterDto } from './../users/dto/page-filter.dto';

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar> {}
