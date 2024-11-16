import pgpClass from "pg-promise";

import { TypeId } from "pg-promise/typescript/pg-subset";
import { config } from "dotenv";
config();

const pgp = pgpClass({
  schema: "scourge",
});

pgp.pg.types.setTypeParser(TypeId.INT8, parseInt);

export const db = pgp({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  user: "postgres",
});
