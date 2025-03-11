import { Request, Response } from "express";
import { updateUser, fetchUser } from "../repository/userCollection";
import type { User } from "@ebuddy/shared";

export const fetchUserHandler = async (req: Request, res: Response) => {
  const { uid } = req.params;
  try {
    const user = await fetchUser(uid);
    if (!user) res.status(404).send({ message: "User not found" });
    else res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const userData = req.body as User; // better to validate using zod

  try {
    await updateUser(uid, userData);
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error });
  }
};
