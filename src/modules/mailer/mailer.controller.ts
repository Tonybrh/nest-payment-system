import { Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserServiceInterface } from '../user/domain/service/user.service.interface';

@Controller('verify-email')
export class VerifyEmailController {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('UserServiceInterface') private readonly userService: UserServiceInterface
    ) {
    }

    @Get()
    async verifyEmail(@Query('token') token: string, @Res() res: Response): Promise<Response> {
        try {
            const payload = this.jwtService.verify(token);
            const userDto = payload.userDto;
            await this.userService.createUserAndWallet(userDto);

            return res.json({ "message": `E-mail ${userDto.email} verificado com sucesso!` });
        } catch (error) {
            throw new Error(error);
        }
    }
}
