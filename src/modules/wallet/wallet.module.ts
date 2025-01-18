import { forwardRef, Module } from "@nestjs/common";
import { WalletServiceInterface } from "./domain/service/wallet.service.interface";
import { WalletService } from "./infrastructure/service/wallet.service";
import { PrismaService } from "prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { WalletRepository } from "./infrastructure/repository/wallet.repository";

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [
        PrismaService,
        { provide: 'WalletServiceInterface', useClass: WalletService },
        { provide: 'WalletRepositoryInterface', useClass: WalletRepository }
    ]
})

export class WalletModule { }