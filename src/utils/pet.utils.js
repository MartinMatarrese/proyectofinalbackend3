import { fakerES as Faker } from "@faker-js/faker";

export const generatePet = () => {
    return {
        name: Faker.animal.type(),
        specie: Faker.animal.type(),
        age: Faker.number.int({ min: 1, max: 15 })
    };
};