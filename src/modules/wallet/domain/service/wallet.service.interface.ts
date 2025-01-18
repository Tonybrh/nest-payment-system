import { Wallet } from "@prisma/client";
import { WalletDto } from "../dto/create.wallet.dto";
import { UpdateWalletDto } from '../dto/update.wallet.dto';

export interface WalletServiceInterface {
    createWallet(walletDto: WalletDto): Promise<Wallet>;
    updateBalance(updateWalletDto: UpdateWalletDto): Promise<void>;
}