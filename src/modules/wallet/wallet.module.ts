import { forwardRef, Module } from "@nestjs/common";
import { WalletService } from "./infrastructure/service/wallet.service";
import { PrismaService } from "prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { WalletRepository } from "./infrastructure/repository/wallet.repository";
import { WalletController } from './wallet.controller';

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [
        PrismaService,
        { provide: 'WalletServiceInterface', useClass: WalletService },
        { provide: 'WalletRepositoryInterface', useClass: WalletRepository }
    ],
    controllers: [WalletController]
})

export class WalletModule { }