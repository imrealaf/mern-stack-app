import { Application } from "express";
import mongoose from "mongoose";
import request from "supertest";

import env from "../lib/env";
import { IUser, User } from "../models/user.model";
import { DbService } from "../services/database";

const userCreds = {
  email: "someemail@something.com",
  password: "123456"
};

let verifyToken: string;
let authToken: string;
let userId: string;
let user: IUser;

export default (app: Application) => {
  return describe("API: Users & Auth", () => {
    beforeAll(async () => {
      await DbService.connect();
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
        expect(verifyToken.length).toBe(
          env.get("AUTH_VERIFY_TOKEN_LENGTH") * 2
        );
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
      it("2. Should resend verification token", async () => {
        const res = await request(app)
          .post("/auth/resend-verify")
          .send({ email: userCreds.email })
          .expect(200)
          .expect("Content-Type", /json/);

        verifyToken = res.body.verifyToken;

        expect(verifyToken).toBeDefined();
        expect(verifyToken.length).toBeGreaterThan(1);
      });
    });

    describe("/auth/verify {POST} -> Verify user", () => {
      it("1. Should fail because of missing token", async () => {
        const res = await request(app)
          .post("/auth/verify")
          .send({})
          .expect(400)
          .expect("Content-Type", /json/);
      });

      it("2. Should successfully verify user", async () => {
        const res = await request(app)
          .post("/auth/verify")
          .send({ token: verifyToken })
          .expect(200)
          .expect("Content-Type", /json/);
      });
    });

    describe("/auth/email {POST} -> Login with email", () => {
      it("1. Should fail because of missing credentials", async () => {
        const res = await request(app)
          .post("/auth/email")
          .send({})
          .expect(400)
          .expect("Content-Type", /json/);
      });

      it("2. Should successfully log user in", async () => {
        const res = await request(app)
          .post("/auth/email")
          .send(userCreds)
          .expect(200)
          .expect("Content-Type", /json/);

        authToken = res.body.token;

        expect(authToken).toBeDefined();
        expect(authToken.length).toBeGreaterThan(1);
      });
    });

    describe("/auth {GET} -> Get current user", () => {
      it("1. Should fail 401 because of missing JWT", async () => {
        const res = await request(app)
          .get("/auth")
          .send({})
          .expect(401)
          .expect("Content-Type", /json/);
      });

      it("2. Should successfully get current logged in user", async () => {
        const res = await request(app)
          .get("/auth")
          .set("Authorization", "bearer " + authToken)
          .expect(200)
          .expect("Content-Type", /json/);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.email).toBe(userCreds.email);
      });
    });

    describe("/api/users/admin {PUT} -> Make user Admin", () => {
      it("1. Should fail from missing secret", async () => {
        const res = await request(app)
          .put(`/api/users/admin/${userId}`)
          .send({})
          .expect(400)
          .expect("Content-Type", /json/);
      });

      it("2. Should successfully make the user an administrator", async () => {
        const res = await request(app)
          .put(`/api/users/admin/${userId}`)
          .send({
            secret: env.get("ADMIN_SECRET")
          })
          .expect(200)
          .expect("Content-Type", /json/);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.secret).toBeDefined();

        user = await User.findById(userId);
        expect(user.role).toBe("admin");
        expect(user.adminSecret).toBeDefined();
      });
    });
  });
};
