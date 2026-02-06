import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([User]),

    PassportModule.register({defaultStrategy:"jwt"}),

    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions:{
            expiresIn: "2h"
          }
        }
      }
    }),
    ConfigModule
  ],
  exports:[JwtStrategy, TypeOrmModule, PassportModule, JwtModule]

})
export class AuthModule {}
