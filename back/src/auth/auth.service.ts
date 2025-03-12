import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "../tokens/jwt.service";
import { RegisterDto, LoginDto } from "./auth.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        const accessToken = this.jwtService.generateAccessToken(user);
        const refreshToken = this.jwtService.generateRefreshToken(user);

        return {
            accessToken,
            refreshToken,
            email: user.email,
            username: user.username,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.getUser(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const accessToken = this.jwtService.generateAccessToken(user);
        const refreshToken = this.jwtService.generateRefreshToken(user);

        return {
            accessToken,
            refreshToken,
            email: user.email,
            username: user.username,
        };
    }
}
