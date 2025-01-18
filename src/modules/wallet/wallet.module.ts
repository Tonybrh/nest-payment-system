import { forwardRef, Module } from "@nestjs/common";
import { WalletService } from "./infrastructure/service/wallet.service";
import { PrismaService } from "prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { WalletRepository } from "./infrastructure/repository/wallet.repository";
import { WalletController } from './wallet.controller';
import { BtcService } from './infrastructure/service/btc.service';
import { HttpModule } from '@nestjs/axios';
import { BtcRepository } from './infrastructure/repository/btc.repository';

@Module({
    imports: [
        forwardRef(() => UserModule),
        HttpModule
    ],
    providers: [
        PrismaService,
        { provide: 'WalletServiceInterface', useClass: WalletService },
        { provide: 'WalletRepositoryInterface', useClass: WalletRepository },
        { provide: 'BtcRepositoryInterface', useClass: BtcRepository},
        BtcService
    ],
    controllers: [WalletController]
})

export class WalletModule { }