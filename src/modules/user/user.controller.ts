import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '../mailer/mailer.service';
import { UserDto } from './dto/user.dto';
import { ExceptionFilter } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly emailService: EmailService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: UserDto): Promise<string> {
        try {
            await this.emailService.sendVerificationEmail(createUserDto.email);
            return 'Verifique seu e-mail para concluir o cadastro.';
        } catch (error) {
            throw new Error(error);
        }
    }
}
