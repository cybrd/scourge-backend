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
import { createMember, getMembers } from "../services/member";
import {
  createMemberByActivityId,
  deleteMemberActivity,
  deleteMemberActivityByActivityId,
  getMembersByActivityId,
} from "../services/member_activity";

export const activityController = Router();

activityController.get("/", authUser(), (req, res) => {
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

activityController.get("/:id/member", authUser(), (req, res) => {
  (async () => {
    const result = await getMembersByActivityId(db, req.params.id);

    res.send(result);
  })().catch((err) => {
    console.trace(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

activityController.post("/:id/member", authUser(), (req, res) => {
  (async () => {
    const rawBody = req.body as string[];
    const body = rawBody.filter((x) => x.trim().length);

    const members = await getMembers(db);
    await Promise.all(
      body.map((x) => {
        if (!members.find((y) => y.discord_name === x)) {
          const data = {
            discord_name: x,
            id: v4(),
            ingame_name: x,
          };

          members.push(data);
          return createMember(db, data);
        }

        return null;
      })
    );

    const result = await Promise.all(
      body.map((x) => {
        const data = {
          activity_id: req.params.id,
          id: v4(),
          member_id: members.find((y) => y.discord_name === x)?.id || "",
        };

        return createMemberByActivityId(db, data);
      })
    );

    res.send(result);
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

activityController.delete("/:id/member/:memberId", authUser(), (req, res) => {
  (async () => {
    const result = await deleteMemberActivity(
      db,
      req.params.id,
      req.params.memberId
    );

    res.send(result);
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
