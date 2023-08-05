import { UserEntity } from "@domain/entities/UserEntity";
import { SignInUseCase } from "@application/usecases/auth/SignInUseCase";

export class AuthController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    async login(req: any, res: any) {
        const { email, password } = req.body;
        const user: UserEntity = {username: "", email, password };

        const token = await this.signInUseCase.execute(user);
        if (!token) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({ token });
    }
}