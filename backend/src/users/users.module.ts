import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { BalanceModule } from '../balance/balance.module';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [
    PrismaModule,
    BalanceModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, BalanceService]
})
export class UsersModule {}
