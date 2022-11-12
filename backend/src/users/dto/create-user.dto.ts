import { IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    username: string

  @IsNotEmpty()
    password: string

  @IsNotEmpty()
    phoneNumber: string

  @IsNotEmpty()
    email: string

  @IsNotEmpty()
    captchaToken: string
}
