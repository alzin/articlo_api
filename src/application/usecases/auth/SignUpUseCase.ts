import { UserEntity } from "@domain/entities/UserEntity";
import { AuthRepository } from "@domain/repositories/auth/AuthRepository";

export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(user: UserEntity): Promise<string> {
    const token = await this.authRepository.signup(user);
    return token;
  }
}
