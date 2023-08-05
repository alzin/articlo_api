import mongoose from "mongoose";
import "../../../main/config/loadEnv";

class DBConnection {
  async connect(): Promise<void> {
    await mongoose.connect(process.env.MONGODB_URI || "", {});
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export default new DBConnection();
