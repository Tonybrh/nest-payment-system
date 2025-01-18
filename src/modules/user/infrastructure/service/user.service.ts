import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepositoryInterface } from '../../domain/repository/user.repository.interface';
import { UserDto } from '../../domain/dto/user.dto';
import { UserServiceInterface } from '../../domain/service/user.service.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface
    ) {
    }

    async createUserAndWallet(userDto: UserDto): Promise<void> {
        await this.userRepository.createUserAndWallet(userDto);
    }
}
