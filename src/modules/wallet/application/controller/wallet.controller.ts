import { Body, Controller, Inject, Put, Res } from '@nestjs/common';
import { WalletServiceInterface } from '../../domain/service/wallet.service.interface';
import { UpdateWalletDto } from '../../domain/dto/update.wallet.dto';
import { Response } from 'express';

@Controller('wallet')
export class WalletController {
    constructor(
      @Inject('WalletServiceInterface') private readonly walletService: WalletServiceInterface,
    ) {
    }

    @Put('update-balance')
    async updateBalance(@Body() updateWalletDto: UpdateWalletDto, @Res() res: Response): Promise<Response> {
        try{
            await this.walletService.updateBalance(updateWalletDto);

            return res.status(200).json({ message: 'Balance updated successfully' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}