CREATE TABLE IF NOT EXISTS  "users" (
  "id" VARCHAR(128)  NOT NULL,
  "username" VARCHAR(128)  NULL,
  "password" VARCHAR(128)  NULL,
  PRIMARY KEY ("id"),
  UNIQUE("id")
);
