import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Verify } from 'crypto';
import { VerifyEmailController } from './mailer.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from './mailer.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: configService.get<string>('MAILTRAP_USER'),
                        pass: configService.get<string>('MAILTRAP_PASS'),
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
            }),
            inject: [ConfigService],
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [VerifyEmailController],
    providers: [EmailService],
})
export class MailerConfigModule { }