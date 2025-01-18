import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { UserController } from '../application/controller/user.controller';
import { EmailService } from '../../mailer/infrastructure/service/mailer.service';
import { UserDto } from '../domain/dto/user.dto';

describe('UserController', () => {
    let userController: UserController;
    let emailService: EmailService;

    const mockEmailService = {
        sendVerificationEmail: jest.fn(),
    };

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: EmailService,
                    useValue: mockEmailService,
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        emailService = module.get<EmailService>(EmailService);

        jest.clearAllMocks();
    });

    it('deve chamar o serviço de e-mail e retornar status 200 com mensagem de sucesso', async () => {
        mockEmailService.sendVerificationEmail.mockResolvedValueOnce(null);

        const userDto: UserDto = {
            email: 'test@example.com',
            name: 'John Doe',
            cpf: '123456789',
            adress: 'Rua dos Bobos, nº 0',
            phone: '123456789',
            income: 1000,
            occupation: 'developer',
            password: '123456',
        };

        await userController.registerUser(userDto, mockResponse);

        expect(emailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
        expect(emailService.sendVerificationEmail).toHaveBeenCalledWith(userDto);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'verifique o email na caixa de entrad' });
    });

    it('deve retornar status 400 e mensagem de erro quando o envio de e-mail falhar', async () => {
        mockEmailService.sendVerificationEmail.mockRejectedValueOnce(new Error('Falha no envio de e-mail'));

        const userDto: UserDto = {
            email: 'test@example.com',
            name: 'John Doe',
            cpf: '123456789',
            adress: 'Rua dos Bobos, nº 0',
            phone: '123456789',
            income: 1000,
            occupation: 'developer',
            password: '123456',
        };

        await userController.registerUser(userDto, mockResponse);

        expect(emailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
        expect(emailService.sendVerificationEmail).toHaveBeenCalledWith(userDto);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Falha no envio de e-mail' });
    });
});
