import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';



export class LoginUserDto {

    @ApiProperty({
        description: 'User email address',
        example: 'user@email.com',
    })
    @IsString()
    @IsEmail()
    email:string

    @ApiProperty({
        description:'User password. Must contain uppercase, lowercase and a number or special character',
        example: 'Password123!',
        minLength: 6,
        maxLength: 50,
        writeOnly: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string
}