import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt.strategy'
import { User } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import { RegisterUserDto } from './dto/register-user-dto'
import { LoginUserDto } from './dto/login-user-dto'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  async register (userDto: RegisterUserDto):
  Promise<RegistrationStatus> {
    const status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS'
    }

    const captchaResponse = await this.httpService.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_CAPTCHA_KEY ?? ''}&response=${userDto.captchaToken}`
    ).toPromise()

    if (captchaResponse?.status !== 200) {
      throw new HttpException('INCORRECT CAPTCHA TOKEN',
        HttpStatus.UNAUTHORIZED)
    }

    const password = await hash(userDto.password, 10)

    try {
      status.data = await this.usersService.create({
        ...userDto,
        password
      })
    } catch (err) {
      throw new HttpException('USER EXISTS',
        HttpStatus.CONFLICT)
    }
    return status
  }

  async login (loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByUsername(loginUserDto.username)

    if (user === null) {
      throw new HttpException('USER DOES NOT EXIST',
        HttpStatus.UNAUTHORIZED)
    }

    const passwordsMatch = await compare(loginUserDto.password, user.password)

    if (!passwordsMatch) {
      throw new HttpException('INVALID_PASSWORD',
        HttpStatus.UNAUTHORIZED)
    }

    const token = this.createToken({
      login: loginUserDto.username
    })

    return {
      ...token
    }
  }

  private createToken ({ login }): any {
    const user: JwtPayload = { login }
    const Authorization = this.jwtService.sign(user)
    return {
      expiresIn: 60,
      Authorization
    }
  }

  async validateUser (payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload)
    if (user === null || user === undefined) {
      throw new HttpException('INVALID_TOKEN',
        HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}

export interface RegistrationStatus {
  success: boolean
  message: string
  data?: User
}
export interface RegistrationSeederStatus {
  success: boolean
  message: string
  data?: User[]
}
