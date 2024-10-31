import { type IDatabase } from "pg-promise";

import { User } from "../models/user";

export const getUserByUsernameAndPassword = (
  db: IDatabase<object>,
  username: string,
  password: string
) => {
  console.log("getUserByUsernameAndPassword", username);

  const query = `
    SELECT *
    FROM users
    WHERE username = $1
    AND password = $2
  `;

  return db.oneOrNone<User>(query, [username, password]);
};

export const getUserByUsername = (db: IDatabase<object>, username: string) => {
  console.log("getUserByUsername", username);

  const query = `
    SELECT *
    FROM users
    WHERE username = $1
  `;

  return db.oneOrNone<User>(query, [username]);
};
