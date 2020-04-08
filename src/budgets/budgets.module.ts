import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { UsersModule } from '../users/users.module';
import { BudgetRepository } from './budgets.repository';
import { EmailsModule } from '../emails/emails.module';
import { AddressService } from '../address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetRepository]),
    UsersModule,
    EmailsModule,
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService, AddressService],
  exports: [BudgetsService],
})
export class BudgetsModule {}
