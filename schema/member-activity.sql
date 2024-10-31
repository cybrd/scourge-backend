CREATE TABLE IF NOT EXISTS  "member_activity" (
  "id" VARCHAR(128) NOT NULL,
  "activity_id" VARCHAR(128) NOT NULL,
  "member_id" VARCHAR(128) NOT NULL,
  "created_timestamp" TIMESTAMP NOT NULL,
  "updated_timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE("activity_id", "member_id")
);

CREATE INDEX "member_activity_member_id" ON "member_activity" ("member_id");
