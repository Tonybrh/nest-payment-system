import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../mailer/infrastructure/service/mailer.service';
import { UserDto } from './domain/dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly emailService: EmailService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: UserDto): Promise<string> {
        try {
            await this.emailService.sendVerificationEmail(createUserDto);
            return 'Verifique seu e-mail para concluir o cadastro.';
        } catch (error) {
            throw new Error(error);
        }
    }
}
