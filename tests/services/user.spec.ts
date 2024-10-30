import assert from "assert";

import { db } from "../../src/connections";

import {
  getUserByUsername,
  getUserByUsernameAndPassword,
} from "../../src/services/user";

describe("service user", () => {
  describe("getUserByUsernameAndPassword", () => {
    it("works success", async () => {
      const result = await getUserByUsernameAndPassword(db, "joy", "joy");

      assert.ok(result);
    });

    it("works fail", async () => {
      const result = await getUserByUsernameAndPassword(db, "joy1", "joy2");

      assert.strictEqual(result, null);
    });
  });

  describe("getUserByUsername", () => {
    it("works success", async () => {
      const result = await getUserByUsername(db, "joy");

      assert.ok(result);
    });

    it("works fail", async () => {
      const result = await getUserByUsername(db, "joy1");

      assert.strictEqual(result, null);
    });
  });
});
