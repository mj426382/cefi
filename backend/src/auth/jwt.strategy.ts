import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { User } from '@prisma/client'
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super({
      jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: `${process.env.SECRETKEY ?? ''}`
    })
  }

  async validate (payload: JwtPayload): Promise<User> {
    const user = await this.authService.validateUser(payload)
    if (user === null) {
      throw new HttpException('Invalid token',
        HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}

export interface JwtPayload { login: string}
