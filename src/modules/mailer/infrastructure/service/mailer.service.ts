import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../../user/domain/dto/user.dto';
import { EmailServiceInterface } from '../../Domain/service/mailer.service.interface';

@Injectable()
export class EmailService implements EmailServiceInterface{
    private baseUrl = 'https://localhost:3000/';
    constructor(
        private readonly mailerService: MailerService,
        private jwtService: JwtService,
    ) {
    }

    async sendVerificationEmail(userDto: UserDto): Promise<void> {
        const token = this.jwtService.sign({ userDto }, { expiresIn: '1h' });
        const verificationUrl = `${this.baseUrl}verify-email?token=${token}`;

        await this.mailerService.sendMail({
            to: userDto.email,
            subject: 'Confirme seu e-mail',
            template: 'verify-email',
            context: {
                name: userDto.name,
                verificationUrl,
                companyName: 'NestJs Payment System',
            },
        });
    }
}
