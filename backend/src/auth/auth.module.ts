import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma/prisma.service'
import * as dotenv from 'dotenv'
import { HttpModule } from '@nestjs/axios'
import { BalanceService } from '../balance/balance.service';
dotenv.config()

@Module({
  imports: [
    HttpModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true
    }),
    JwtModule.register({
      secret: 'mycustomuselongsecret',
      signOptions: {
        expiresIn: 60
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService, BalanceService],
  exports: [
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {
}
