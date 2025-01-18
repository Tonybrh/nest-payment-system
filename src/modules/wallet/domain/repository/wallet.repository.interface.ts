import { Wallet } from "@prisma/client";
import { WalletDto } from "../dto/create.wallet.dto";

export interface WalletRepositoryInterface {
    createWallet(walletDto: WalletDto): Promise<Wallet>;
    getWalletByUserId(userId: number): Promise<Wallet>;
    updateBalance(dolarBalance: number, walletId: number): Promise<void>
    findOne(walletId: number): Promise<Wallet>;
    updateWallet(walletId: number, btcBalance: number, dolarBalance): Promise<void>;
}