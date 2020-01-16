import dotenv from "dotenv-flow";
import { Application } from "express";
import mongoose from "mongoose";
import request from "supertest";

dotenv.config();

import { initApp } from "../../app";
import { env } from "../../env";
import { User } from "../../models";
import { dbService } from "../../services/db";

const userCreds = {
  email: "someemail@something.com",
  password: "123456"
};

const app: Application = initApp();

describe("-- API: Users & Auth", () => {
  let verifyToken: string;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    await dbService.connect();
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteOne(this);
    }
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  describe("/api/users {POST} -> Create User", () => {
    it("1. Should fail because of missing required field", async () => {
      const res = await request(app)
        .post("/api/users")
        .send(userCreds)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(res.body.message).toBeDefined();
      expect(res.body.message.length).toBeGreaterThan(1);
    });

    it("2. Should create new user with verification token", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          ...userCreds,
          name: "Bob"
        })
        .expect(200)
        .expect("Content-Type", /json/);

      verifyToken = res.body.verifyToken;
      userId = res.body.userId;
      expect(verifyToken).toBeDefined();
      expect(userId).toBeDefined();
      expect(verifyToken.length).toBe(env("AUTH_VERIFY_TOKEN_LENGTH") * 2);
    });

    it("3. User should not be able to log in because account not verified", async () => {
      const res = await request(app)
        .post("/auth/email")
        .send(userCreds)
        .expect(400);
    });
  });

  describe("/auth/resend-verify {POST} -> Resend verification", () => {
    it("1. Should fail because of missing email field", async () => {
      const res = await request(app)
        .post("/auth/resend-verify")
        .send({})
        .expect(400)
        .expect("Content-Type", /json/);
    });
  });

  describe("/api/users/admin {PUT} -> Make user Admin", () => {
    it("should make the user an administrator", async () => {
      const res = await request(app)
        .put(`/api/users/admin/${userId}`)
        .send({
          secret: env("ADMIN_SECRET")
        })
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.secret).toBeDefined();

      const user = await User.findById(userId);
      expect(user.role).toBe("admin");
      expect(user.adminSecret).toBeDefined();
    });
  });

  describe("/auth/resend-verify {POST} -> Make user Admin", () => {
    it("should make the user an administrator", async () => {
      const res = await request(app)
        .put(`/api/users/admin/${userId}`)
        .send({
          secret: env("ADMIN_SECRET")
        })
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.secret).toBeDefined();

      const user = await User.findById(userId);
      expect(user.role).toBe("admin");
      expect(user.adminSecret).toBeDefined();
    });
  });

  // describe("/api/users {POST} -> Create User", () => {

  //   it("/auth/email {POST} - shouldn't be able to log in because email not verified", async () => {
  //     const res = await request(app)
  //       .post("/auth/email")
  //       .send(userCreds)
  //       .expect(400)
  //       .expect("Content-Type", /json/);

  //     expect(res.body.message).toBeDefined();
  //     expect(res.body.message.length).toBeGreaterThan(1);
  //   });

  //   it("/auth/resend-verify {POST} - should resend verification token", async () => {
  //     const { email } = userCreds;
  //     const res = await request(app)
  //       .post("/auth/resend-verify")
  //       .send({
  //         email
  //       })
  //       .expect(200)
  //       .expect("Content-Type", /json/);

  //     verifyToken = res.body.verifyToken;

  //     expect(verifyToken).toBeDefined();
  //     expect(verifyToken.length).toBe(env("AUTH_VERIFY_TOKEN_LENGTH") * 2);
  //   });

  //   it("/auth/verify {POST} - should verify user's account", async () => {
  //     const res = await request(app)
  //       .post("/auth/verify")
  //       .send({
  //         token: verifyToken
  //       })
  //       .expect(200)
  //       .expect("Content-Type", /json/);

  //     expect(res.body.message).toBeDefined();
  //     expect(res.body.message.length).toBeGreaterThan(1);
  //   });

  //   it("/auth/email {POST} - should log user in and return JWT", async () => {
  //     const res = await request(app)
  //       .post("/auth/email")
  //       .send(userCreds)
  //       .expect(200)
  //       .expect("Content-Type", /json/);

  //     authToken = res.body.token;

  //     expect(authToken).toBeDefined();
  //     expect(authToken.length).toBeGreaterThan(1);
  //   });

  //   it("/auth {GET} - should get current user with JWT", async () => {
  //     const res = await request(app)
  //       .get("/auth")
  //       .set("Authorization", "bearer " + authToken)
  //       .expect(200)
  //       .expect("Content-Type", /json/);

  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.email).toBe(userCreds.email);
  //   });
  // });
});
