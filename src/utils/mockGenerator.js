import bcrypt from "bcrypt";
import { fakerES as faker } from "@faker-js/faker";

export const generateUsers = () => {
    return {
        first_name: faker.person.firstname(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("coder123", 10),
        role: Math.random() < 0.5 ? "user" : "admin",
        pets: []
    };
};