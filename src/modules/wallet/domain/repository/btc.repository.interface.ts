import { Prisma } from '@prisma/client';

export interface BtcRepositoryInterface {
    createBtc(data: Prisma.BtcCreateInput): Promise<void>;
    updateBtc(data: Prisma.BtcUpdateInput, where: Prisma.BtcWhereUniqueInput): Promise<void>;
}