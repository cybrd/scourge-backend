import pgpClass, { type IDatabase } from "pg-promise";

import { Count } from "../models/pg";
import { Member } from "../models/member";

export const getMembers = (db: IDatabase<object>) => {
  console.log("getMembers");

  const query = `
    SELECT *
    FROM members
  `;

  return db.manyOrNone<Member>(query, []);
};

export const getMemberById = (db: IDatabase<object>, id: string) => {
  console.log("getMemberById", id);

  const query = `
    SELECT *
    FROM members
    WHERE id = $1
  `;

  return db.oneOrNone<Member>(query, [id]);
};

export const getMembersCount = (db: IDatabase<object>) => {
  console.log("getMembersCount");

  const query = `
    SELECT COUNT(*)
    FROM members
  `;

  return db.one<Count>(query, []);
};

export const createMember = (db: IDatabase<object>, data: Member) => {
  console.log("createMember");

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

  let query = pgp.helpers.insert(data, insertFields, "members");
  query += ' ON CONFLICT("id") DO UPDATE SET ';
  query += insertFields.assignColumns({
    from: "EXCLUDED",
    skip: ["id"],
  });
  query += " RETURNING *";

  return db.oneOrNone<Member>(query);
};

export const updateMember = (
  db: IDatabase<object>,
  id: string,
  data: Partial<Member>
) => {
  console.log("updateMember", id);

  const fields = Object.keys({
    ...data,
    updated_timestamp: "",
  }).map((x) => {
    switch (x) {
      case "updated_timestamp":
        return { init: () => "NOW()", mod: ":raw", name: x };
      default:
        return x;
    }
  });

  const pgp = pgpClass({});
  const updateFields = new pgp.helpers.ColumnSet(fields);
  const condition = pgp.as.format(" WHERE id = ${id}", { id });

  let query = String(pgp.helpers.update(data, updateFields, "members"));
  query += condition;
  query += " RETURNING *";

  return db.oneOrNone<Member>(query);
};

export const deleteMember = (db: IDatabase<object>, id: string) => {
  console.log("deleteMember", id);

  const query = `
    DELETE FROM members
    WHERE id = $1
    RETURNING *
  `;

  return db.oneOrNone<Member>(query, [id]);
};
