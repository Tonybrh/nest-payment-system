import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from '../application/controller/wallet.controller';
import { Response } from 'express';
import { UpdateWalletDto } from '../domain/dto/update.wallet.dto';
import { WalletServiceInterface } from '../domain/service/wallet.service.interface';

describe('WalletController', () => {
    let walletController: WalletController;
    let walletService: WalletServiceInterface;

    const mockWalletService = {
        updateBalance: jest.fn(),
    };

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WalletController],
            providers: [
                {
                    provide: 'WalletServiceInterface',
                    useValue: mockWalletService,
                },
            ],
        }).compile();

        walletController = module.get<WalletController>(WalletController);
        walletService = module.get<WalletServiceInterface>('WalletServiceInterface');

        jest.clearAllMocks();
    });

    it('must call the service to update the balance and return status 200 with a success message', async () => {
        mockWalletService.updateBalance.mockResolvedValueOnce(null);

        const updateWalletDto: UpdateWalletDto = {
            userId: 1,
            dolarBalance: 500,
        };

        await walletController.updateBalance(updateWalletDto, mockResponse);

        expect(walletService.updateBalance).toHaveBeenCalledTimes(1);
        expect(walletService.updateBalance).toHaveBeenCalledWith(updateWalletDto);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Balance updated successfully' });
    });

    it('should return status 400 and error message when balance update fails', async () => {
        mockWalletService.updateBalance.mockRejectedValueOnce(new Error('Failed to update balance'));

        const updateWalletDto: UpdateWalletDto = {
            userId: 1,
            dolarBalance: 500,
        };

        await walletController.updateBalance(updateWalletDto, mockResponse);

        expect(walletService.updateBalance).toHaveBeenCalledTimes(1);
        expect(walletService.updateBalance).toHaveBeenCalledWith(updateWalletDto);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to update balance' });
    });
});
