import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../../user/domain/dto/user.dto';
import { EmailServiceInterface } from '../../Domain/service/mailer.service.interface';

@Injectable()
export class EmailService implements EmailServiceInterface{

    constructor(
        private readonly mailerService: MailerService,
        private jwtService: JwtService,
    ) {
    }

    async sendVerificationEmail(userDto: UserDto): Promise<void> {
        const token = this.jwtService.sign({ userDto }, { expiresIn: '1h' });
        const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

        await this.mailerService.sendMail({
            to: userDto.email,
            subject: 'Confirme seu e-mail',
            text: `Por favor, clique no link abaixo para verificar seu e-mail:\n\n${verificationUrl}`,
            html: `<p>Por favor, clique no link abaixo para verificar seu e-mail:</p><a href="${verificationUrl}">Verificar E-mail</a>`,
        });
    }
}
