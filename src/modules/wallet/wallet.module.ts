import { forwardRef, Module } from "@nestjs/common";
import { WalletService } from "./infrastructure/service/wallet.service";
import { PrismaService } from "prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { WalletRepository } from "./infrastructure/repository/wallet.repository";
import { WalletController } from './application/controller/wallet.controller';
import { BtcService } from './infrastructure/service/btc.service';
import { HttpModule } from '@nestjs/axios';
import { BtcRepository } from './infrastructure/repository/btc.repository';
import { BtcController } from './application/controller/btc.controller';

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
        {provide: 'BtcServiceInterface', useClass: BtcService},
    ],
    controllers: [WalletController, BtcController]
})

export class WalletModule { }