import { Router } from "express";
import { updateUserHandler, fetchUserHandler } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/fetch-user-data/:uid", authMiddleware, fetchUserHandler);
router.put("/update-user-data/:uid", authMiddleware, updateUserHandler);

export default router;
