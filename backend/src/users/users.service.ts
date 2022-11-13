import { Injectable } from '@nestjs/common'
import { User, UserCurrencyBalance } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaService,
    private readonly balanceService: BalanceService) {}

  create (createUserDto: CreateUserDto): Promise<User> {
    const { username, password, phoneNumber, email } = createUserDto
    return this.prisma.user.create({
      data: {
        username,
        password,
        phoneNumber,
        email
      }
    })
  }

  findAll (): Promise<User[]> {
    return this.prisma.user.findMany({})
  }

  findByUsername (username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username
      }
    })
  }

  findByEmail (email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  findByPhoneNumber (phoneNumber: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        phoneNumber
      }
    })
  }

  findByPayload ({ login: username }): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { username }
    })
  }

  update (id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, password, phoneNumber, email } = updateUserDto
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        username,
        password,
        phoneNumber,
        email
      }
    })  
  }

  remove (id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  getUserCurrencyBalances(id: number): Promise<UserCurrencyBalance[]> {
    return this.balanceService.getUserCurrencyBalances(id);
  }
}
