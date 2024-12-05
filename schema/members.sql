CREATE TABLE IF NOT EXISTS  "members" (
  "id" VARCHAR(128) NOT NULL,
  "discord_name" VARCHAR(128) NOT NULL,
  "ingame_name" VARCHAR(128) NOT NULL,
  "weapon" VARCHAR(128) NOT NULL,
  "team" VARCHAR(128) NOT NULL,
  "created_timestamp" TIMESTAMP NOT NULL,
  "updated_timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE("discord_name"),
  UNIQUE("ingame_name")
);
