import { User } from "@prisma/client";
import { UserDto } from "../dto/user.dto";

export interface UserServiceInterface {
    createUserAndWallet(userDto: UserDto): Promise<void>;
}