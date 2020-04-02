import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BudgetRepository } from './budgets.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { BudgetDto } from './dto/budget.dto';
import { User } from '../users/models/user.entity';
import { v4 as uuidv4 } from 'uuid';

import { Logger } from '@nestjs/common';
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

    this.logger.verbose(user);

    if (user) {
      return await this.budgetRepository.createBudget(budget, user);
    }

    const search = await this.usersService.findOne(email);

    this.logger.error(search);

    if (search) {
      throw new BadRequestException('User must be logged');
    }

    if (!search && !user) {
      const { username, surname, email, phoneNumber } = budget.user;
      const password = uuidv4();
      const passwordConfirmation = password;
      const newuser = await this.usersService.signUp({
        password,
        username,
        surname,
        email,
        phoneNumber,
        passwordConfirmation,
      });

      return await this.budgetRepository.createBudget(budget, newuser);
    }
  }
}
