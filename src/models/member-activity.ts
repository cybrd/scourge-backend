import { Activity } from "./activity";
import { Member } from "./member";

export type MemberActivity = {
  id: string;
  activity_id: string;
  member_id: string;
};

export type MemberActivityFull = MemberActivity & Member & Activity;
