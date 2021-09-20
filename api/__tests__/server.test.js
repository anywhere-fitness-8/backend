const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

beforeAll(async () => {
  // await db.migrate.rollback();
  // await db.migrate.latest();
});
beforeEach(async () => {
  // await db.seed.run();
});
afterAll(async (done) => {
  // await db.destroy();
  done();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("Auth Endpoints", () => {
  describe("[POST] register request", () => {
    it("adds a record to the db", async () => {
      await request(server).post("/api/auth/register").send({
        username: "BobbieSue",
        password: "RS84JFAFQ3JF9Q3NL",
        email: "BOB@gmail.com",
        remaining_classes: "10",
        role_id: "1",
      });
      expect(await db("users")).toHaveLength(1);
      expect(await db("users")).not.toHaveLength(34);
    });
    it("responds with the new user", async () => {
      const newUser = await request(server).post("/api/auth/register").send({
        username: "BobbieSue",
        password: "RS84JFAFQ3JF9Q3NL",
        email: "BOB@gmail.com",
        remaining_classes: "10",
        role_id: "1",
      });
      expect(newUser.body.username).toEqual("BobbieSue");
    });
  });
  describe("[POST] login request", () => {
    it("returns a token", async () => {
      await request(server).post("/api/auth/register").send({
        username: "AuntDeb",
        password: "R9824NFEN92843NF",
        email: "AUNTDEB@gmail.com",
        remaining_classes: "3",
        role_id: "2",
      });
      const res = await request(server).post("/api/auth/login").send({
        username: "AuntDeb",
        password: "R9824NFEN92843NF",
      });
      const { token } = res.body;
      expect(token).not.toBeNull();
      expect(token).toBeTruthy();
    });
    it("rejects invalid credentials", async () => {
      const res = await request(server).post("/api/auth/login").send({
        username: "AuntDeb",
        password: "R9824NFEN92843NF",
      });
      const { status } = res;
      expect(status).toBe(500);
    });
  });
});
