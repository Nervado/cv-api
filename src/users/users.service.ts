import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async create(createUserDto: { name: string }) {
    return createUserDto;
  }

  async delete(userId: number) {
    return userId;
  }
}
