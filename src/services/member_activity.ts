import pgpClass, { type IDatabase } from "pg-promise";

import { MemberActivity, MemberActivityFull } from "../models/member-activity";

export const getMembersByActivityId = (db: IDatabase<object>, id: string) => {
  console.log("getMembersByActivityId", id);

  const query = `
    SELECT *
    FROM member_activity ma
    JOIN activity a ON a.id = ma.activity_id
    JOIN members m ON m.id = ma.member_id
    WHERE activity_id = $1
  `;

  return db.manyOrNone<MemberActivityFull>(query, [id]);
};

export const createMemberByActivityId = (
  db: IDatabase<object>,
  data: MemberActivity
) => {
  console.log("createMemberByActivityId");

  const fields = Object.keys({
    ...data,
    created_timestamp: "",
    updated_timestamp: "",
  }).map((x) => {
    switch (x) {
      case "created_timestamp":
      case "updated_timestamp":
        return { init: () => "NOW()", mod: ":raw", name: x };
      default:
        return x;
    }
  });

  const pgp = pgpClass({});
  const insertFields = new pgp.helpers.ColumnSet(fields);

  let query = pgp.helpers.insert(data, insertFields, "member_activity");
  query += ' ON CONFLICT("id") DO UPDATE SET ';
  query += insertFields.assignColumns({
    from: "EXCLUDED",
    skip: ["id"],
  });
  query += " RETURNING *";

  return db.oneOrNone<MemberActivity>(query);
};

export const deleteMemberActivity = (
  db: IDatabase<object>,
  activityId: string,
  memberId: string
) => {
  console.log("deleteMemberActivity", activityId, memberId);

  const query = `
    DELETE FROM member_activity
    WHERE activity_id = $1
    AND member_id = $2
    RETURNING *
  `;

  return db.oneOrNone<MemberActivity>(query, [activityId, memberId]);
};

export const deleteMemberActivityByMemberId = (
  db: IDatabase<object>,
  id: string
) => {
  console.log("deleteMemberActivityByMemberId", id);

  const query = `
    DELETE FROM member_activity
    WHERE member_id = $1
    RETURNING *
  `;

  return db.manyOrNone<MemberActivity>(query, [id]);
};

export const deleteMemberActivityByActivityId = (
  db: IDatabase<object>,
  id: string
) => {
  console.log("deleteMemberActivityByActivityId", id);

  const query = `
    DELETE FROM member_activity
    WHERE activity_id = $1
    RETURNING *
  `;

  return db.manyOrNone<MemberActivity>(query, [id]);
};
