import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("create")
    async create(@Body() userData: Partial<User>): Promise<User> {
        return this.usersService.create(userData);
    }

    @Put("update/:email")
    async update(@Param("email") email: string, @Body() updateData: Partial<User>): Promise<User> {
        return this.usersService.update(email, updateData);
    }

    @Delete("delete/:id")
    async remove(@Param("id") id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Get("get/all")
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get("get/:email")
    async getUser(@Param("email") email: string): Promise<User> {
        return this.usersService.getUser(email);
    }
}
