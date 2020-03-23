import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.entity';
import { AuthSingUpDto } from '../auth/dto/auth-signup.dto';
import { AuthLoginCredentialsDto } from '../auth/dto/auth-login.dto';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSingUpDto: AuthSingUpDto): Promise<void> {
    const { email, password, username, passwordConfirmation } = authSingUpDto;

    if (!(passwordConfirmation && passwordConfirmation === password)) {
      throw new BadRequestException('Passwords dont match');
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.ispro = false;
    user.admin = false;

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authLoginCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<User> {
    console.log(authLoginCredentialsDto);
    const { email, password } = authLoginCredentialsDto;

    const user = await this.findOne({
      where: { email },
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async index(pageFilterDto: PageFilterDto): Promise<User[]> {
    console.log(pageFilterDto.page);
    const pageNumber: number = pageFilterDto.page * 5 - 5;
    const users = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(5)
      .getMany();

    return users;
  }

  async updateOne(id: number, updateUserDto: UserUpdateDto): Promise<User> {
    const user = await this.findOne(id);
    this.merge(user, updateUserDto);
    const results = await this.save(user);
    return results;
  }
}
