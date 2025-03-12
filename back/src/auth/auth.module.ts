import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '../tokens/jwt.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret_key',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {}
