import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { db } from "../connections";

import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivitiesCount,
  getActivityById,
  updateActivity,
} from "../services/activity";
import { Activity } from "../models/activity";
import { authUser } from "../middlewares/auth";
import { v4 } from "uuid";

export const activityController = Router();

activityController.get("/", authUser(), (req, res) => {
  (async () => {
    const [data, counts] = await Promise.all([
      getActivities(db),
      getActivitiesCount(db),
    ]);

    res.json({
      counts,
      data,
    });
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.get("/:id", authUser(), (req, res) => {
  (async () => {
    const result = await getActivityById(db, req.params.id);

    res.send(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.put("/:id", authUser(), (req, res) => {
  (async () => {
    const body = req.body as Activity;

    const result = await updateActivity(db, req.params.id, body);

    res.send(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.post("/", authUser(), (req, res) => {
  (async () => {
    const body = req.body as Activity;
    const id = v4();
    const activity_timestamp = "";
    const created_timestamp = "";
    const updated_timestamp = "";

    const result = await createActivity(db, {
      ...body,
      activity_timestamp,
      created_timestamp,
      id,
      updated_timestamp,
    });

    res.json(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.delete("/:id", authUser(), (req, res) => {
  (async () => {
    const result = await deleteActivity(db, req.params.id);

    res.send(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
