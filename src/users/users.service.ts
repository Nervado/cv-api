import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async create(createUserDto: { name: string }) {
    return createUserDto;
  }

  async delete(userId: number) {
    return userId;
  }

  async getAll() {
    return;
  }
}
