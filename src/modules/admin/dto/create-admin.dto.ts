import { IsIn, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { TypeAdmin } from "../enum/type-admin.enum";

export class CreateAdminDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    phone: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    @IsIn([TypeAdmin.normal, TypeAdmin.root])
    typeAdmin: TypeAdmin
}