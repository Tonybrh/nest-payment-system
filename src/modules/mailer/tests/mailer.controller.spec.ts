import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { VerifyEmailController } from '../application/controller/mailer.controller';
import { UserServiceInterface } from '../../user/domain/service/user.service.interface';

describe('VerifyEmailController', () => {
    let verifyEmailController: VerifyEmailController;
    let jwtService: JwtService;
    let userService: UserServiceInterface;

    const mockJwtService = {
        verify: jest.fn(),
    };

    const mockUserService = {
        createUserAndWallet: jest.fn(),
    };

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VerifyEmailController],
            providers: [
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: 'UserServiceInterface',
                    useValue: mockUserService,
                },
            ],
        }).compile();

        verifyEmailController = module.get<VerifyEmailController>(VerifyEmailController);
        jwtService = module.get<JwtService>(JwtService);
        userService = module.get<UserServiceInterface>('UserServiceInterface');

        jest.clearAllMocks();
    });

    it('should verify the email successfully and return status 200 with success message', async () => {
        const userDto = { email: 'test@example.com' };
        const token = 'validToken';
        mockJwtService.verify.mockReturnValueOnce({ userDto });
        mockUserService.createUserAndWallet.mockResolvedValueOnce(null);

        await verifyEmailController.verifyEmail(token, mockResponse);

        expect(jwtService.verify).toHaveBeenCalledTimes(1);
        expect(jwtService.verify).toHaveBeenCalledWith(token);
        expect(userService.createUserAndWallet).toHaveBeenCalledTimes(1);
        expect(userService.createUserAndWallet).toHaveBeenCalledWith(userDto);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: `E-mail ${userDto.email} verificado com sucesso!` });
    });

    it('should return status 400 and error message when token verification fails', async () => {
        const token = 'invalidToken';
        mockJwtService.verify.mockImplementationOnce(() => {
            throw new Error('Invalid token');
        });

        await verifyEmailController.verifyEmail(token, mockResponse);

        expect(jwtService.verify).toHaveBeenCalledTimes(1);
        expect(jwtService.verify).toHaveBeenCalledWith(token);
        expect(userService.createUserAndWallet).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('should return status 400 and error message when user creation fails', async () => {
        const userDto = { email: 'test@example.com' };
        const token = 'validToken';
        mockJwtService.verify.mockReturnValueOnce({ userDto });
        mockUserService.createUserAndWallet.mockRejectedValueOnce(new Error('Failed to create user and wallet'));

        await verifyEmailController.verifyEmail(token, mockResponse);

        expect(jwtService.verify).toHaveBeenCalledTimes(1);
        expect(jwtService.verify).toHaveBeenCalledWith(token);
        expect(userService.createUserAndWallet).toHaveBeenCalledTimes(1);
        expect(userService.createUserAndWallet).toHaveBeenCalledWith(userDto);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to create user and wallet' });
    });
});
