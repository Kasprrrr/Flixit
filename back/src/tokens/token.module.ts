import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "./jwt.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [JwtModule.register({})],
    providers: [JwtService, JwtStrategy],
    exports: [JwtService],
})
export class TokensModule {}
