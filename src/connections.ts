import { config } from "dotenv";
import pgpClass from "pg-promise";
config();

export const db = pgpClass()({
  database: "scourge",
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true,
  user: "postgres",
});
