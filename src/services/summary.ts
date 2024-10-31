import { type IDatabase } from "pg-promise";

import { MemberWithPoints } from "../models/member";

export const getMembersTotalPoints = (db: IDatabase<object>) => {
  console.log("getMembersTotalPoints");

  const query = `
    SELECT discord_name, ingame_name, SUM(a.points) AS total_points
    FROM members m
    JOIN member_activity ma ON ma.member_id = m.id
    JOIN activity a ON a.id = ma.activity_id
    GROUP BY 1, 2
  `;

  return db.manyOrNone<MemberWithPoints>(query, []);
};
