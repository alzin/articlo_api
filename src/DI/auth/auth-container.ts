import { AuthRepositoryImpt } from "../../infra/services/auth/AuthRepositoryImpt";
import { SignInUseCase } from "../../application/usecases/auth/SignInUseCase";
import { SignUpUseCase } from "../../application/usecases/auth/SignUpUseCase";
import { AuthController } from "../../controllers/auth/AuthController";

const authRepository = new AuthRepositoryImpt();
const signInUseCase = new SignInUseCase(authRepository);
const signUpUseCase = new SignUpUseCase(authRepository);
export const authController = new AuthController(signInUseCase, signUpUseCase);
