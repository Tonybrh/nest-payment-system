import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { Prisma } from '@prisma/client';
import { BtcRepositoryInterface } from '../../domain/repository/btc.repository.interface';
import { BuyBtcDto } from '../../domain/dto/buy.btc.dto';
import { WalletServiceInterface } from '../../domain/service/wallet.service.interface';
import { WalletRepositoryInterface } from '../../domain/repository/wallet.repository.interface';
import { BtcServiceInterface } from '../../domain/service/btc.service.interface';

@Injectable()
export class BtcService implements BtcServiceInterface {
    private readonly logger = new Logger(BtcService.name);
    private readonly SYMBOL_BTC = 'BTCUSDT';
    private readonly BASE_URL = 'https://api.binance.com/api/v3/ticker/price';

    constructor(
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService,
        @Inject('BtcRepositoryInterface') private readonly btcRepository: BtcRepositoryInterface,
        @Inject('WalletServiceInterface') private readonly walletService: WalletServiceInterface,
        @Inject('WalletRepositoryInterface') private readonly walletRepository: WalletRepositoryInterface,
    ) {
    }

    @Cron('*/1 * * * *')
    async updateBtcPrice(): Promise<void> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.BASE_URL, {
                    params: { symbol: this.SYMBOL_BTC },
                }),
            );

            const btcPrice = parseFloat(response.data.price);

            const existingRecord = await this.prisma.btc.findFirst();

            const data: Prisma.BtcCreateInput = {
                symbol: this.SYMBOL_BTC,
                value: btcPrice
            }

            if (existingRecord) {
                await this.btcRepository.updateBtc(
                    data,
                    existingRecord,
                );
                this.logger.log(`BTC price updated to ${btcPrice}`);
            } else {
                await this.btcRepository.createBtc(data);
                this.logger.log(`BTC price saved as ${btcPrice}`);
            }
        } catch (error) {
            this.logger.error('Failed to update BTC price', error.message);
        }
    }

    async buyBtcInDolar(buyBtcDto: BuyBtcDto): Promise<void> {
        try {
            const wallet = await this.walletRepository.findOne(buyBtcDto.walletId);
            const walletDolarBalance = wallet.dolarBalance.toNumber();
            if (!wallet) {
                throw new Error('Carteira não encontrada');
            }

            if (walletDolarBalance < buyBtcDto.dolarBtcAmount) {
                throw new Error('Saldo insuficiente');
            }

            const btcRate = await this.btcRepository.getBtcRateInDollars(this.SYMBOL_BTC);
            if (!btcRate) {
                throw new Error('Erro ao obter a taxa de câmbio do Bitcoin');
            }

            const btcAmount = buyBtcDto.dolarBtcAmount / btcRate;
            const dolarAmount = walletDolarBalance - buyBtcDto.dolarBtcAmount;

            await this.walletRepository.updateWallet(buyBtcDto.walletId, btcAmount, dolarAmount);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
