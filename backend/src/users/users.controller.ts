import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { CurrentUser } from 'src/auth/current-user'
import { User } from '@prisma/client'

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async findCurrent (@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Get('/username-exists/:username')
  async findByUsername (@Param('username') username: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username)
    return user !== null
  }

  @Get('/email-exists/:email')
  async findByEmail (@Param('email') email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email)
    return user !== null
  }

  @Get('/phone-number-exists/:phoneNumber')
  async findByPhoneNumber (@Param('phoneNumber') phoneNumber: string): Promise<boolean> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber)
    return user !== null
  }
}
