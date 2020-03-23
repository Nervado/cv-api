import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async index(pageFilterDto: PageFilterDto) {
    return this.userRepository.index(pageFilterDto);
  }

  get(id) {
    return this.userRepository.findOne(id);
  }

  async update(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    // TODO ... check if avatar exists
    return this.userRepository.updateOne(id, userUpdateDto);
  }
}
