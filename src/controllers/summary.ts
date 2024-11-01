import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { db } from "../connections";

import { getMembersTotalPoints } from "../services/summary";

export const summaryController = Router();

summaryController.get("/", (req, res) => {
  (async () => {
    const result = await getMembersTotalPoints(db);

    res.json(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
