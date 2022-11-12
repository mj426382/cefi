import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { CurrentUser } from 'src/auth/current-user'

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll () {
    return this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  findCurrent (@CurrentUser() user: any) {
    return user
  }

  @Get('/username-exists/:username')
  async findByUsername (@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username)
    return user !== null
  }

  @Get('/email-exists/:email')
  async findByEmail (@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email)
    return user !== null
  }

  @Get('/phone-number-exists/:phoneNumber')
  async findByPhoneNumber (@Param('phoneNumber') phoneNumber: string) {
    const user = await this.usersService.findByPhoneNumber(phoneNumber)
    return user !== null
  }
}
