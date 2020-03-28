import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './models/user.entity';
import { AuthSingUpDto } from 'src/auth/dto/auth-signup.dto';
import { LoginDto } from 'src/auth/dto/auth-login.dto';
import { EmailsService } from '../emails/emails.service';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private emailsService: EmailsService,
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

  async signUp(authSingUpDto: AuthSingUpDto): Promise<UserDto> {
    const newuser = await this.userRepository.signUp(authSingUpDto);
    newuser && (await this.emailsService.sendEmail(authSingUpDto));
    return newuser;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    return this.userRepository.validateUser(loginDto);
  }
}
