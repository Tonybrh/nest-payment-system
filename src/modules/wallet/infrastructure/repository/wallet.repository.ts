import { Wallet } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { WalletDto } from '../../domain/dto/create.wallet.dto';
import { WalletRepositoryInterface } from '../../domain/repository/wallet.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletRepository implements WalletRepositoryInterface {
  constructor(private prismaService: PrismaService) { }

  async createWallet(data: WalletDto): Promise<Wallet> {
    try {
      return await this.prismaService.wallet.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async getWalletByUserId(userId: number): Promise<Wallet> {
    try {
      return await this.prismaService.wallet.findFirst({
        where: {
          userId: userId,
        },
      });

    } catch (error) {
      throw error;
    }
  }

  async updateBalance(dolarBalance: number, walletId: number): Promise<void> {
    try {
      await this.prismaService.wallet.update({
        where: {
          id: walletId,
        },
        data: {
          dolarBalance: dolarBalance
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(walletId: number): Promise<Wallet> {
    try {
      return await this.prismaService.wallet.findFirst({ where: { id: walletId } });
    } catch (error) {
      throw error;
    }
  }

  async updateWallet(walletId: number, btcBalance: number, dolarBalance: number): Promise<void> {
    try {
      await this.prismaService.wallet.update({
        where: {
          id: walletId,
        },
        data: {
          btcBalance: btcBalance,
          dolarBalance: dolarBalance
        },
      });
    } catch (error) {
      throw error;
    }
  }
}