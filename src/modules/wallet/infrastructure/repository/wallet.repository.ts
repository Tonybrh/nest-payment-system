import { Wallet } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { WalletDto } from '../../domain/dto/create.wallet.dto';
import { WalletRepositoryInterface } from '../../domain/repository/wallet.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletRepository implements WalletRepositoryInterface {
  constructor(
    private prismaService: PrismaService
  ) {
  }

  async createWallet(data: WalletDto): Promise<Wallet> {
      try {
          const wallet = await this.prismaService.wallet.create({data});
          console.log("Wallet created:", wallet);
          return wallet;
      } catch (error) {
          console.error("Error creating wallet:", error);
          throw error;
      }  }
}