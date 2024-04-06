import request from "supertest";
import { sequelize } from "../../../../DB/connectDB.js";
import app from "../../../index.js";

beforeAll(async () => {
  await sequelize.sync(/* { force: true } */);
});
afterAll(async () => {
  await sequelize.close();
});

describe.skip("SignUp controller", () => {
  it.only("Data not completed ", async () => {
    const response = await request(app).post("/v1/user/signup").send({
      username: "Ahmed",
      email: "xxx@gmail.com",
    });
    expect(response.statusCode).toBe(400);
  });
  it.only("Data send correct", async () => {
    const response = await request(app).post("/v1/user/signup").send({
      username: "Ahmed",
      email: "xxxxss121@gmail.com",
      password: "12345",
      confirmPassword: "12345",
    });
    expect(response.statusCode).toBe(200);
  });
  it.only("Data is already exists", async () => {
    const response = await request(app).post("/v1/user/signup").send({
      username: "Ahmed",
      email: "xxxxss1@gmail.com",
      password: "12345",
      confirmPassword: "12345",
    });
    expect(response.statusCode).toBe(409);
  });
});

describe.skip("Login Controller", () => {
  it.skip("If the user name or password not exists", async () => {
    const response = await request(app).post("/v1/user/login").send({
      email: "ahmed@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(404);
  });
  it.only("User name and passowrd are correct ", async () => {
    const response = await request(app).post("/v1/user/login").send({
      email: "xxxx@gmail.com",
      password: "12345",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

describe.skip("Update Controller", () => {
  it("if User dosent have token", async () => {
    const response = await request(app).put("/v1/user/update");
    expect(response.statusCode).toBe(403);
  });
  it("if the user dosent add the bearre key", async () => {
    const response = await request(app)
      .put("/v1/user/update")
      .set("token", "eeeeee");
    expect(response.statusCode).toBe(403);
  });
  it("if the user add the token correct but not valid", async () => {
    const response = await request(app)
      .put("/v1/user/update")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXdtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTcxMjQzMTkxOH0.qLzYXJaZrCe7ScVDb5NWtEdyvrpFBxhjORvT24n40XM"
      );
    expect(response.statusCode).toBe(403);
  });
  it("if the user add the token correct and pass data", async () => {
    const response = await request(app)
      .put("/v1/user/update")
      .send({
        username: "Yasser",
      })
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ4eHh4QGdtYWlsLmNvbSIsImlhdCI6MTcxMjQzNDUxOX0.HwvmBmoll9bd5RZmgpUOUEGOwCYesWWiqCZQPJoiytM"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe.skip("deleteAccount", () => {
  it("if User dosent have token", async () => {
    const response = await request(app).delete("/v1/user/delete");
    expect(response.statusCode).toBe(403);
  });
  it("if the user dosent add the bearre key", async () => {
    const response = await request(app)
      .delete("/v1/user/delete")
      .set("token", "eeeeee");
    expect(response.statusCode).toBe(403);
  });
  it("if the user add the token correct but not valid", async () => {
    const response = await request(app)
      .delete("/v1/user/delete")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXdtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTcxMjQzMTkxOH0.qLzYXJaZrCe7ScVDb5NWtEdyvrpFBxhjORvT24n40XM"
      );
    expect(response.statusCode).toBe(403);
  });
  it("The user add a valid token", async () => {
    const response = await request(app)
      .delete("/v1/user/delete")
      .set(
        "token",
        "Key__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ4eHh4QGdtYWlsLmNvbSIsImlhdCI6MTcxMjQzNDkyNH0.O8USsO456mwyu8MtG8SrrZ-_EsX5PuYERPr0yYCEb7Y"
      );
    expect(response.status).toBe(200);
  });
});
