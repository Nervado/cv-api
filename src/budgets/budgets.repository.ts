import { Budget } from './models/budget.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BudgetDto } from './dto/budget.dto';
import { BudgetStatus } from './enums/budget-status.enum';

import { Logger, InternalServerErrorException } from '@nestjs/common';

import { User } from 'src/users/models/user.entity';

@EntityRepository(Budget)
export class BudgetRepository extends Repository<BudgetDto> {
  private logger = new Logger('BudgetRepository');

  async createBudget(budgetDto: BudgetDto, user?: User): Promise<Budget> {
    const budget = new Budget();

    budget.user = user;

    this.merge(budget, budgetDto);

    try {
      await budget.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a budget for user id: "${user}". Data: ${budgetDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete budget.user;
    return budget;
  }
}
