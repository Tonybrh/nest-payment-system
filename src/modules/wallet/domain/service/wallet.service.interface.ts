import { Wallet } from "@prisma/client";
import { WalletDto } from "../dto/create.wallet.dto";

export interface WalletServiceInterface {
    createWallet(walletDto: WalletDto): Promise<Wallet>;
}