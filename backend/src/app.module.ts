import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
