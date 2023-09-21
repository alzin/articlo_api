import { UserEntity } from "@domain/entities/UserEntity";
import { SignInUseCase } from "@application/usecases/auth/SignInUseCase";
import { SignUpUseCase } from "@application/usecases/auth/SignUpUseCase";
import { log } from "console";

export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  async login(req: any, res: any) {
    const { email, password } = req.body;
    const user: UserEntity = { username: "", email, password };

    const token = await this.signInUseCase.execute(user);
    if (!token) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ token });
  }

  async signup(req: any, res: any) {
    log(req.body);
    const { username, email, password } = req.body;
    const user: UserEntity = { username, email, password };

    const token = await this.signUpUseCase.execute(user);
    if (!token) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ token });
  }
}
