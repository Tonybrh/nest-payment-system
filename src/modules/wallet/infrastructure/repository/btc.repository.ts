import { PrismaService } from '../../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { BtcRepositoryInterface } from '../../domain/repository/btc.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BtcRepository implements BtcRepositoryInterface {
    constructor(
        private readonly prismaService: PrismaService,
    ) {
    }

    async createBtc(data: Prisma.BtcCreateInput) {
        console.log(data)
        await this.prismaService.btc.create({ data });
    }

    async updateBtc(data: Prisma.BtcUpdateInput, where: Prisma.BtcWhereUniqueInput) {
        await this.prismaService.btc.update({ data, where });
    }

    async getBtcRateInDollars(symbol: string): Promise<number> {
        const btc = await this.prismaService.btc.findFirst({
            where: {
                symbol,
            },
        });

        return btc.value.toNumber();
    }
}