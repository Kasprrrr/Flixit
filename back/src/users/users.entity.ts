import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    first_name: string;

    @Column({ length: 50 })
    last_name: string;

    @Column({ unique: true, length: 50 })
    username: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ nullable: true })
    profile_picture_url: string;

    @Column({ default: "user" })
    role: string;
}
