import "../config/loadEnv";
import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not provided.",
    });
  }

  verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      log("err: ", err);
      return res.status(403).json({
        message: "Invalid token.",
      });
    }
    req.body.user = user;
    next();
  });
};
