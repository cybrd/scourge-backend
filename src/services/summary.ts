import { type IDatabase } from "pg-promise";

import { MemberWithPoints } from "../models/member";

export const getMembersTotalPoints = (db: IDatabase<object>) => {
  console.log("getMembersTotalPoints");

  const query = `
    SELECT discord_name, ingame_name,
    SUM(CASE WHEN a."type" IN ('Bestowed (Archboss)') THEN 0 ELSE a.points END) AS available_points,
    SUM(CASE WHEN a."type" IN ('Bestowed') THEN 0 ELSE a.points END) AS available_archboss_points,
    SUM(CASE WHEN a."type" IN ('Bestowed', 'Bestowed (Archboss)') THEN 0 ELSE a.points END) AS total_points
    FROM members m
    JOIN member_activity ma ON ma.member_id = m.id
    JOIN activity a ON a.id = ma.activity_id
    GROUP BY 1, 2
    ORDER BY available_points DESC
  `;

  return db.manyOrNone<MemberWithPoints>(query, []);
};
