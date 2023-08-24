import { UserEntity } from "@domain/entities/UserEntity";
import { AuthRepository } from "@domain/repositories/auth/AuthRepository";

export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(user: UserEntity): Promise<boolean> {
    const createdUser = await this.authRepository.signup(user);

    const result = createdUser ? true : false;
    return result;
  }
}
