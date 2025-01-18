import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { BuyBtcDto } from '../../domain/dto/buy.btc.dto';
import { Response } from 'express';
import { BtcServiceInterface } from '../../domain/service/btc.service.interface';


@Controller('btc')
export class BtcController {
    constructor(
        @Inject("BtcServiceInterface") private readonly btcService: BtcServiceInterface,
    ) {
    }

    @Post('buy')
    async buyBtc(@Body() buyBtcDto: BuyBtcDto, @Res() res: Response ): Promise<Response> {
        try {
            await this.btcService.buyBtcInDolar(buyBtcDto);

            return res.status(200).json({ message: 'BTC bought successfully' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}