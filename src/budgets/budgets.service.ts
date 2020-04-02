import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BudgetRepository } from './budgets.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { BudgetDto } from './dto/budget.dto';
import { User } from 'src/users/models/user.entity';
import { v4 as uuidv4 } from 'uuid';

import { Logger } from '@nestjs/common';
import { stringify } from 'querystring';
import { Budget } from './models/budget.entity';

@Injectable()
export class BudgetsService {
  private logger = new Logger();
  constructor(
    @InjectRepository(BudgetRepository)
    private budgetRepository: BudgetRepository,

    private usersService: UsersService,
  ) {}

  async createBudget(budget: BudgetDto, user?: User): Promise<Budget> {
    const email = budget.user.email;

    const search = await this.usersService.findOne(email);

    this.logger.warn(search);

    try {
      this.logger.debug(this.usersService.get(36));
      // const _user = await this.usersService.findOne(email);

      /**

      this.logger.debug('here...');

      if (_user) {
        // send user to login
        throw new BadRequestException('User must be logged');
      }

      if (!_user && !user) {
        const { username, surname, email, phoneNumber } = budget.user;
        const password = uuidv4();
        const newuser = await this.usersService.signUp({
          password,
          username,
          surname,
          email,
          phoneNumber,
        });
        
        return await this.budgetRepository.createBudget(budget, newuser);

         
      }
      */
    } catch (error) {
      throw new InternalServerErrorException('Fail to create budget');
    }

    // this.logger.warn(_user);

    return await this.budgetRepository.createBudget(budget, user);
  }
}
