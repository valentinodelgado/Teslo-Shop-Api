import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';



export class CreateUserDto {

    @ApiProperty({
        description: 'User email address (must be unique)',
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

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    fullName:string
}