import request from "supertest";
import { sequelize } from "../../../../DB/connectDB.js";
import app from "../../../index.js";

beforeAll(async () => {
  await sequelize.sync(/* { force: true } */);
});
afterAll(async () => {
  await sequelize.close();
});

describe.skip("GetAllTask Controller", () => {
  test.only("user dosent app token", async () => {
    const response = await request(app).get("/v1/task");
    expect(response.statusCode).toBe(403);
  });
  test.only("user add invalid token", async () => {
    const response = await request(app)
      .get("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLns"
      );
    expect(response.statusCode).toBe(403);
  });
  test.skip("user add valid token and user don't have task", async () => {
    const response = await request(app)
      .get("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body.results).toEqual({ tasks: [] });
  });

  test.skip("user has  one task", async () => {
    const response = await request(app)
      .get("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body.results.tasks.length).toBe(1);
  });
  test.only("user has  more than one task", async () => {
    const response = await request(app)
      .get("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    const length = response.body.results.tasks.length;
    expect(response.statusCode).toBe(200);
    expect(response.body.results.tasks.length).toBe(length);
    expect(response.body.results.tasks.length).toBeGreaterThanOrEqual(1);
  });
});

describe.skip("create Task Controller", () => {
  test("should User add title at least if not  ", async () => {
    const response = await request(app)
      .post("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBeFalsy();
  });

  test.skip("should User add title at least   ", async () => {
    const response = await request(app)
      .post("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      )
      .send({
        title: "Task5",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
  });

  test("should User not added before ", async () => {
    const response = await request(app)
      .post("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      )
      .send({
        title: "Task5",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBeFalsy();
  });
});

describe.skip("update Task Controller", () => {
  test("should user add the id oF task", async () => {
    const response = await request(app)
      .put("/v1/task")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    expect(response.statusCode).toBe(404);
  });
  test("should user add the id oF task not found", async () => {
    const taskId = 10;
    const response = await request(app)
      .put(`/v1/task/${taskId}`)
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    expect(response.statusCode).toBe(404);
  });
  test("should user add the id oF task  found", async () => {
    const taskId = 3;
    const response = await request(app)
      .put(`/v1/task/${taskId}`)
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe.skip("Completed Task", () => {
  test("should add the taskID if not ", async () => {
    const response = await request(app).patch(`/v1/task/complete`);
    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy();
  });
  test("should add the task id if add and not found ", async () => {
    const taskID = 10;
    const response = await request(app)
      .patch(`/v1/task/complete/${taskID}`)
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBeFalsy();
  });

  test("should add the task id if add and not found ", async () => {
    const taskID = 2;
    const response = await request(app)
      .patch(`/v1/task/complete/${taskID}`)
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ4eHh4c0BnbWFpbC5jb20iLCJpYXQiOjE3MTI0MzgxMTN9.5bQZ7GXBttOp6fsCRWTeSCrbLm-64jePn0_04GDkLnE"
      );

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});
