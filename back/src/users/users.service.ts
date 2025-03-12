import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async update(email: string, updateData: Partial<User>): Promise<User> {
        await this.userRepository.update(email, updateData);
        return this.getUser(email);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }
}
