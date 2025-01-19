import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { BtcController } from '../application/controller/btc.controller';
import { BtcServiceInterface } from '../domain/service/btc.service.interface';
import { BuyBtcDto } from '../domain/dto/buy.btc.dto';

describe('BtcController', () => {
    let btcController: BtcController;
    let btcService: BtcServiceInterface;

    const mockBtcService = {
        buyBtcInDolar: jest.fn(),
    };

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BtcController],
            providers: [
                {
                    provide: 'BtcServiceInterface',
                    useValue: mockBtcService,
                },
            ],
        }).compile();

        btcController = module.get<BtcController>(BtcController);
        btcService = module.get<BtcServiceInterface>('BtcServiceInterface');

        jest.clearAllMocks();
    });

    it('must call the service to buy BTC and return status 200 with success message', async () => {
        mockBtcService.buyBtcInDolar.mockResolvedValueOnce(null);

        const buyBtcDto: BuyBtcDto = {
            walletId: 1,
            dolarBtcAmount: 1000,
        };

        await btcController.buyBtc(buyBtcDto, mockResponse);

        expect(btcService.buyBtcInDolar).toHaveBeenCalledTimes(1);
        expect(btcService.buyBtcInDolar).toHaveBeenCalledWith(buyBtcDto);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'BTC bought successfully' });
    });

    it('should return status 400 and error message when BTC purchase fails', async () => {
        mockBtcService.buyBtcInDolar.mockRejectedValueOnce(new Error('Failed to buy BTC'));

        const buyBtcDto: BuyBtcDto = {
            walletId: 1,
            dolarBtcAmount: 1000,
        };

        await btcController.buyBtc(buyBtcDto, mockResponse);

        expect(btcService.buyBtcInDolar).toHaveBeenCalledTimes(1);
        expect(btcService.buyBtcInDolar).toHaveBeenCalledWith(buyBtcDto);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to buy BTC' });
    });
});
