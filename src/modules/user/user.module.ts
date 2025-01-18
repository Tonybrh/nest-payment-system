import { Module } from '@nestjs/common';
import { UserController } from './application/controller/user.controller';
import { EmailService } from '../mailer/infrastructure/service/mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletModule } from '../wallet/wallet.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { WalletService } from '../wallet/infrastructure/service/wallet.service';
import { WalletRepository } from '../wallet/infrastructure/repository/wallet.repository';

@Module({
    imports: [
        MailerModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
            inject: [ConfigService],
        }),
        WalletModule
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        PrismaService,
        EmailService,
        { provide: 'UserRepositoryInterface', useClass: UserRepository },
        { provide: 'WalletServiceInterface', useClass: WalletService },
        { provide: 'WalletRepositoryInterface', useClass: WalletRepository }
    ],
})
export class UserModule { }
