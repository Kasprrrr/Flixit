export class RegisterDto {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export class LoginDto {
    email: string;
    password: string;
}
