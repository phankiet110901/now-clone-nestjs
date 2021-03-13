import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Admin } from '../admin/admin.entity';
import { AuthService } from './auth.service';
import { UsernameLoginDto } from './dto/admin-login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('admin-login')
    @UsePipes(ValidationPipe)
    async loginAdmin(@Body() usernameLoginDto: UsernameLoginDto): Promise<Object> {
        return await this.authService.verifyAdmin(usernameLoginDto);
    }
}
