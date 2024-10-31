import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { db } from "../connections";

import { authUser } from "../middlewares/auth";
import { getMembersTotalPoints } from "../services/summary";

export const summaryController = Router();

summaryController.get("/", authUser(), (req, res) => {
  (async () => {
    const result = await getMembersTotalPoints(db);

    res.json(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
