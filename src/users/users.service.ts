import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PageFilterDto } from './dto/page-filter.dto';

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
}
