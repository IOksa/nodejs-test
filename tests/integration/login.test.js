require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("./../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;
describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/users/register").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("testUser1@gmail.com");
  });

  it("status code 409 register", async () => {
    await supertest(app).post("/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    const response = await supertest(app).post("/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(409);
  });
});


describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
   
    expect(response.statusCode).toBe(200);

    expect(response.body.data.user.email).toBe("testUser1@gmail.com");

    expect(typeof response.body.data.token).toBe("String");

    const tokenLength=response.body.data.token.length;
    let isToken = false;
    if(tokenLength>0){
      isToken=true;
      expect(isToken).toBe(true);
    }
        
    expect(typeof response.body.data.user).toBe("Object");
    expect(typeof response.body.data.user.email).toBe("String");
    expect(typeof response.body.data.user.subscription).toBe("String");
  });

  it("should not login not registered user - email", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser3@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(401);
  });

  it("should not login not registered user - password", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "1234567",
    });

    expect(response.statusCode).toBe(401);
  });

  test("email should be string", async () => {

    expect(() => supertest(app).post("/users/login").send({
      email: 1234,
      password: "123456"}).toThrow('email must be String'));
  });

  test("password should be string", async () => {

    expect(() => supertest(app).post("/users/login").send({
      email: "testUser2@gmail.com",
      password: 123456}).toThrow('password must be String'));
  });


});