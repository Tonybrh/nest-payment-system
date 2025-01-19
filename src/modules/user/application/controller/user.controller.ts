import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailService } from '../../../mailer/infrastructure/service/mailer.service';
import { UserDto } from '../../domain/dto/user.dto';
import { Response } from 'express';
import {Public } from '../../../auth/constants/constants';

@Controller('users')
export class UserController {
    constructor(private readonly emailService: EmailService) { }

    @Public()
    @Post('register')
    async registerUser(@Body() createUserDto: UserDto, @Res() res: Response): Promise<Response> {
        try {
            await this.emailService.sendVerificationEmail(createUserDto);

            return res.status(200).json({ message: 'verifique o email na caixa de entrad' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
