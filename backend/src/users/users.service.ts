import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaService) {}

  create (createUserDto: CreateUserDto) {
    const { username, password, phoneNumber, email } = createUserDto
    return this.prisma.user.create({
      data: {
        username,
        password,
        phoneNumber,
        email,
      }
    })
  }

  findAll () {
    return this.prisma.user.findMany({})
  }

  findByUsername (username: string) {
    return this.prisma.user.findFirst({
      where: {
        username
      }
    })
  }

  findByEmail (email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  findByPhoneNumber (phoneNumber: string) {
    return this.prisma.user.findFirst({
      where: {
        phoneNumber
      }
    })
  }

  async findByPayload ({ login }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { username: login }
    })
  }

  findOne (id: number) {
    return `This action returns a #${id} user`
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
