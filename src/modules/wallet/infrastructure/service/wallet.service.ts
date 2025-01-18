import { Inject, Injectable } from "@nestjs/common";
import { WalletServiceInterface } from "../../domain/service/wallet.service.interface";
import { WalletDto } from "../../domain/dto/create.wallet.dto";
import { PrismaService } from "prisma/prisma.service";
import { Wallet } from "@prisma/client";
import { WalletRepositoryInterface } from "../../domain/repository/wallet.repository.interface";

@Injectable()
export class WalletService implements WalletServiceInterface {

    constructor(
        @Inject('WalletRepositoryInterface') private readonly walletRepository: WalletRepositoryInterface,
    ) {
    }

    async createWallet(walletDto: WalletDto): Promise<Wallet> {
        return  this.walletRepository.createWallet(walletDto);
    }
}