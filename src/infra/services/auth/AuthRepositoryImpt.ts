import { UserEntity } from "../../../domain/entities/UserEntity";
import { AuthRepository } from "../../../domain/repositories/auth/AuthRepository";
import User from "../../DB/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthRepositoryImpt implements AuthRepository {
  async login(userEntity: UserEntity): Promise<string> {
    const user = await User.findOne({ email: userEntity.email });

    if (!user) {
      return "";
    }

    const isPasswordValid = await bcrypt.compare(
      userEntity.password,
      user.password,
    );
    if (!isPasswordValid) {
      return "";
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return token;
  }

  async signup(user: UserEntity): Promise<string> {
    const isRegistered = await User.findOne({ email: user.email });

    if (isRegistered) {
      return "";
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
    );
    return token;
  }
}
