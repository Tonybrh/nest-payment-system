import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from './infrastructure/service/mailer.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/infrastructure/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { WalletService } from '../wallet/infrastructure/service/wallet.service';
import { WalletModule } from '../wallet/wallet.module';
import { VerifyEmailController } from './application/controller/mailer.controller';
import { WalletRepository } from '../wallet/infrastructure/repository/wallet.repository';
import { UserService } from '../user/infrastructure/service/user.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


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
                template: {
                    dir: join(__dirname, '../../../../templates/mails/'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
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
        UserModule,
        WalletModule
    ],
    controllers: [VerifyEmailController],
    providers: [
        EmailService,
        PrismaService,
        { provide: 'UserRepositoryInterface', useClass: UserRepository },
        { provide: 'WalletServiceInterface', useClass: WalletService },
        { provide: 'WalletRepositoryInterface', useClass: WalletRepository },
        { provide: 'UserServiceInterface', useClass: UserService},
    ],
})
export class MailerConfigModule { }