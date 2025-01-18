import { Body, Controller, Inject, Put } from '@nestjs/common';
import { WalletServiceInterface } from '../../domain/service/wallet.service.interface';
import { UpdateWalletDto } from '../../domain/dto/update.wallet.dto';

@Controller('wallet')
export class WalletController {
    constructor(
      @Inject('WalletServiceInterface') private readonly walletService: WalletServiceInterface,
    ) {
    }

    @Put('update-balance')
    async updateBalance(@Body() updateWalletDto: UpdateWalletDto): Promise<void> {
        return this.walletService.updateBalance(updateWalletDto);
    }
}