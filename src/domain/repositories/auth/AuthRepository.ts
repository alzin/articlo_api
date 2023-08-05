import { UserEntity } from "../../entities/UserEntity";

export interface AuthRepository {
  login(user: UserEntity): Promise<string>;
  signup(user: UserEntity): Promise<string>;
}
