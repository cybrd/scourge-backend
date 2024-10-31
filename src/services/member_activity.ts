import { type IDatabase } from "pg-promise";

import { MemberActivityFull } from "../models/member-activity";

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
