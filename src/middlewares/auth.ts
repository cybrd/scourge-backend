import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

import { db } from "../connections";

import { User } from "../models/user";
import { getUserByUsername } from "../services/user";

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

export const authUser = (): RequestHandler => (req, res, next) => {
  console.log("authUser");

  if (!req.headers.authorization) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
    return;
  }

  const [_, token] = req.headers.authorization.split(" ");

  try {
    const userToken = verify(token, "secret") as User;

    getUserByUsername(db, userToken.username)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  } catch {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
