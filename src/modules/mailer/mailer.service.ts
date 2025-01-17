import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {

    constructor(
        private readonly mailerService: MailerService,
        private jwtService: JwtService,
    ) {
    }

    async sendVerificationEmail(email: string): Promise<void> {
        const token = this.jwtService.sign({ email }, { expiresIn: '1h' });
        const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Confirme seu e-mail',
            text: `Por favor, clique no link abaixo para verificar seu e-mail:\n\n${verificationUrl}`,
            html: `<p>Por favor, clique no link abaixo para verificar seu e-mail:</p><a href="${verificationUrl}">Verificar E-mail</a>`,
        });
    }
}
