CREATE TABLE IF NOT EXISTS  "user_activity" (
  "id" VARCHAR(128) NOT NULL,
  "activity_id" VARCHAR(128) NOT NULL,
  "user_id" VARCHAR(128) NOT NULL,
  "created_timestamp" TIMESTAMP NOT NULL,
  "updated_timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);
