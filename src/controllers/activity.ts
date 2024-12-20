import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

import { db } from "../connections";

import { Activity } from "../models/activity";
import { authUser } from "../middlewares/auth";

import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivitiesCount,
  getActivityById,
  updateActivity,
} from "../services/activity";
import { deleteMemberActivityByActivityId } from "../services/member_activity";

export const activityController = Router();

activityController.get("/", (req, res) => {
  (async () => {
    const [data, counts] = await Promise.all([
      getActivities(db),
      getActivitiesCount(db),
    ]);

    res.json({
      counts: counts.count,
      data,
    });
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.get("/:id", (req, res) => {
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

    const result = await createActivity(db, {
      ...body,
      id,
    });

    res.json(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.delete("/:id", authUser(), (req, res) => {
  (async () => {
    await deleteMemberActivityByActivityId(db, req.params.id);
    const result = await deleteActivity(db, req.params.id);

    res.send(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
