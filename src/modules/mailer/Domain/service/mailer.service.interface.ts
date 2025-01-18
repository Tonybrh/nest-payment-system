import { UserDto } from '../../../user/domain/dto/user.dto';

export interface EmailServiceInterface {
  sendVerificationEmail(userDto: UserDto): Promise<void>;
}