import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) res.status(401).send({ message: "Unauthorized" });
    else {
      await auth.verifyIdToken(token);
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
