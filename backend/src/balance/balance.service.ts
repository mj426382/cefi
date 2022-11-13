
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { UserCurrencyBalance } from '@prisma/client';

@Injectable()
export class BalanceService {
    constructor (private readonly prisma: PrismaService) {}

  async getUserCurrencyBalances (userId: number):
  Promise<UserCurrencyBalance[]> {
    const balances = await this.prisma.userCurrencyBalance.findMany({
      where: {
        userId,
      },
      include: {
        currency: true,
      }
    })
    return balances
  }
}
