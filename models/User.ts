import { Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  articles: string[]; // Article IDs
}

export default User;
