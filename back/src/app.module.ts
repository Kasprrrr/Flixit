import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AnimesModule } from "./animes/animes.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as "postgres",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
        }),
        UsersModule,
        AuthModule,
        AnimesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
