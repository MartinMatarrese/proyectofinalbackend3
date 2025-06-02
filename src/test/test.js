import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
// import { describe, test } from "node:test";
// import assert from "node:assert";
import mongoose from "mongoose";
import app from "../server.js";
import request from "supertest";

const mockUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 100 }),
        password: faker.internet.password(),
        role: "user"
    };
};

//const apiUrl = "http://localhost:8080";

describe("TEST API", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.MONGO_URL)
        await mongoose.connection.collection("users").drop().catch(() => {});
    });

    let userRegister = null;
    let cookieToken = null

    test("[POST] /register", async() => {
        const body = mockUser();

        userRegister = {
            email: body.email,
            password: body.password
        };

        const response = await request(app).post("/users/register").send(body).expect(201);
        // const response = await fetch(`${apiUrl}/users/register`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(body)
        // })
        const raw = await response.text();
        let responseApi;
        try {
            responseApi = JSON.parse(raw)
        } catch(error) {
            console.error("La respuesta no fue JSON válida");
            console.error(raw);                        
        }
        //const responseApi = await response.json();
        const id = responseApi._id;        
        const firstNameResponse = responseApi.first_name;
        const firstNameExp = body.first_name;
        const lastNameResponse = responseApi.last_name;
        const lastNameExp = body.last_name;
        const emailResponse = responseApi.email;
        const emailExp = body.email;
        const ageResponse = responseApi.age;
        const ageExp = body.age;
        const passwordResponse = responseApi.password;
        const passwordExp = body.password;
        const isPasswordValid = await bcrypt.compare(passwordExp, passwordResponse)
        const statusCode = response.status;
        expect(id).toBeDefined();
        expect(typeof id ).toBe("string");
        expect(id.length).toBe(24);
        expect(firstNameResponse).toBe(firstNameExp);
        expect(lastNameResponse).toBe(lastNameExp);
        expect(emailResponse).toBe(emailExp);
        expect(ageResponse).toBe(ageExp);
        expect(isPasswordValid).toBe(true);
        expect(responseApi.cart.length).toBe(24);
        expect(statusCode).toBe(201)
        // assert.ok(id, "El campo _id no fue generado")
        // assert.equal( typeof id, "string");
        // assert.equal(id.length, 24)
        // assert.ok(firstNameExp, "El campo first_name no esta definido")
        // assert.equal(firstNameResponse, firstNameExp);
        // assert.ok(lastNameExp, "El campo last_name no esta definido");
        // assert.equal(lastNameResponse, lastNameExp);
        // assert.ok(emailExp, "El campo email no esta definido");
        // assert.equal(emailResponse.toLowerCase(), emailExp.toLowerCase());
        // assert.ok(ageExp, "El campo age no esta definido");
        // assert.equal(ageResponse, ageExp);
        // assert.ok(passwordExp, "El campo password no esta definido");
        // assert.ok(isPasswordValid, "La contraseña no coincide con el hash almacenado");
        // assert.ok(responseApi.cart, "El campo cart no fue generado");
        // assert.equal(typeof responseApi.cart, "string");
        // assert.equal(responseApi.cart.length, 24);
        // assert.equal(statusCode, 201);
    });

    // test("[POST] /login", async() => {
    //     const response = (await request(app).post("/users/login")).send(userRegister).expect(200)
    //     const SetCookieHeader = response.headers["set-cookie"];        
    //     expect(SetCookieHeader.some((cookie) => cookie.includes("token="))).toBe(true);
    //     cookieToken = SetCookieHeader[0].split(";")[0];
    // });
});