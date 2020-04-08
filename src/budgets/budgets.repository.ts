import { Budget } from './models/budget.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Address } from '../address/models/address.entity';
import { BudgetDto } from './dto/budget.dto';

import { Logger, InternalServerErrorException } from '@nestjs/common';

import { User } from '../users/models/user.entity';

@EntityRepository(Budget)
export class BudgetRepository extends Repository<BudgetDto> {
  private logger = new Logger('BudgetRepository');

  async createBudget(
    budgetDto: BudgetDto,
    user?: User,
    address?: Address,
  ): Promise<Budget> {
    const budget = new Budget();

    budget.user = user;
    budget.address = address;

    this.merge(budget, budgetDto);

    try {
      await budget.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a budget for user id: "${user.userId}". Data: ${budgetDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete budget.user;
    return budget;
  }
}
