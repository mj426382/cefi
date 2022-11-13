import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaService) {}

  async create (createUserDto: CreateUserDto): Promise<User> {
    const { username, password, phoneNumber, email } = createUserDto
    return await this.prisma.user.create({
      data: {
        username,
        password,
        phoneNumber,
        email
      }
    })
  }

  async findAll (): Promise<User[]> {
    return await this.prisma.user.findMany({})
  }

  async findByUsername (username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        username
      }
    })
  }

  async findByEmail (email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  async findByPhoneNumber (phoneNumber: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        phoneNumber
      }
    })
  }

  async findByPayload ({ login: username }): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { username }
    })
  }

  findOne (id: number): string {
    return `This action returns a #${id} user`
  }

  update (id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`
  }

  remove (id: number): string {
    return `This action removes a #${id} user`
  }
}
