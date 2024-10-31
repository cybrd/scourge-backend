import { Router } from "express";
import { authUser } from "../middlewares/auth";

export const testController = Router();

testController.get("/admin", authUser(), (req, res) => {
  res.json(Math.random());
});
