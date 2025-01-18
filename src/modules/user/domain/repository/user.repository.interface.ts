import { User, Wallet } from "@prisma/client";
import { UserDto } from "../dto/user.dto";

export interface UserRepositoryInterface {
    createUserAndWallet(userDto: UserDto): Promise<{ user: User, wallet: Wallet }>;
}