import { Inject, Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "../../domain/repository/user.repository.interface";
import { PrismaService } from "prisma/prisma.service";
import { UserDto } from "../../domain/dto/user.dto";
import { Prisma, User, Wallet } from "@prisma/client";
import { WalletServiceInterface } from "../../../wallet/domain/service/wallet.service.interface";
import { WalletDto } from "src/modules/wallet/domain/dto/create.wallet.dto";

@Injectable()
export class UserRepository implements UserRepositoryInterface {

    constructor(
        private prismaService: PrismaService,
        @Inject('WalletServiceInterface') private readonly walletService: WalletServiceInterface
    ) {
    }

    async createUserAndWallet(data: UserDto): Promise<{ user: User, wallet: Wallet }> {
        const user = await this.prismaService.user.create({ data });

        const walletDto: WalletDto = {
            userId: user.id,
            dolarBalance: 0,
            btcBalance: 0,
        };

        const wallet = await this.walletService.createWallet(walletDto);

        return { user, wallet };
    }
}