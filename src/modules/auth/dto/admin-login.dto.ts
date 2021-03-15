import { IsNotEmpty } from "class-validator";

export class UsernameLoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}