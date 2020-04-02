import { Controller, Post, Body } from '@nestjs/common';
import { BudgetDto } from './dto/budget.dto';
import { User } from '../users/models/user.entity';
import { GetUser } from '../users/decorators/get-user.decorator';
import { Budget } from './models/budget.entity';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private budgestService: BudgetsService) {}
  @Post()
  async createBudget(
    @Body() budget: BudgetDto,
    @GetUser() user: User,
  ): Promise<Budget> {
    return this.budgestService.createBudget(budget, user);
  }
}
