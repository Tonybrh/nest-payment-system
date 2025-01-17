import { Controller, Get, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('verify-email')
export class VerifyEmailController {
    constructor(private readonly jwtService: JwtService) { }

    @Get()
    async verifyEmail(@Query('token') token: string): Promise<string> {
        try {
            const payload = this.jwtService.verify(token);
            const email = payload.email;

            return `O e-mail ${email} foi confirmado com sucesso!`;
        } catch (error) {
            throw new Error(error);
        }
    }
}
