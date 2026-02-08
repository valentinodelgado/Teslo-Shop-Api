import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto,LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { Auth, RoleProtected } from './decorators';
import { ValidRoles } from './interfaces';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        id: 'c1b2f9c4-0c55-4c9a-9e8d-4e4c5f7e1234',
        email: 'user@email.com',
        fullName: 'John Doe',
        isActive: true,
        roles: ['user'],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (email already exists)',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        id: 'c1b2f9c4-0c55-4c9a-9e8d-4e4c5f7e1234',
        email: 'user@email.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login(loginUserDto);
  }

  @Get("check-status")
  @Auth()
  @ApiOperation({ summary: 'Check authentication status and renew token' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Valid token',
    schema: {
      example: {
        id: 'c1b2f9c4-0c55-4c9a-9e8d-4e4c5f7e1234',
        email: 'user@email.com',
        fullName: 'John Doe',
        roles: ['user'],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  checkAuthStatus(
    @GetUser() user:User
  ){
    return this.authService.checkAuthStatus(user)
  }


  @Get("private")
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiOperation({ summary: 'Test private route (admin / superUser only)' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Access granted',
    schema: {
      example: {
        ok: true,
        user: {
          id: 'c1b2f9c4-0c55-4c9a-9e8d-4e4c5f7e1234',
          email: 'admin@email.com',
          roles: ['admin'],
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden – insufficient role',
  })
  testingPrivateRoute(
    @GetUser() user:User
  ){
    return{
      ok:true,
      user,
    }
  }



}
