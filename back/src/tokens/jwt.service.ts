import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { User } from "../users/users.entity";

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: NestJwtService) {}

    generateAccessToken(user: User): string {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET_KEY,
            expiresIn: "1h",
        });
    }

    generateRefreshToken(user: User): string {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET_KEY,
            expiresIn: "7d",
        });
    }
}
