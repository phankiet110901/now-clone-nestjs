import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";

export class EditAdminDto {
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    @IsMobilePhone('vi-VN')
    phone: string;
}

