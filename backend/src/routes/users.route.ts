import { Router } from "express";
import { getUsers } from "../handlers/users.controller";

const router = Router();

router.get("/",getUsers);

router.get("/:id");

export default router
