import pgpClass from "pg-promise";

import { config } from "dotenv";
config();

export const db = pgpClass()({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  user: "postgres",
});
