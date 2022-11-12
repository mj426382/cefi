import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common'
import { AuthService, RegistrationStatus } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user-dto'
import { RegisterUserDto } from './dto/register-user-dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('register')
  public async register (@Body() registerUserDto: RegisterUserDto):
  Promise<RegistrationStatus> {
    console.log({registerUserDto})
    const result: RegistrationStatus = await this.authService.register(registerUserDto)
    if (!result.success) {
      throw new HttpException(result.message,
        HttpStatus.BAD_REQUEST)
    }

    return result
  }

  @Post('login')
  public async login (@Body() loginUserDto: LoginUserDto):
  Promise<any> {
    return await this.authService.login(loginUserDto)
  }
}
