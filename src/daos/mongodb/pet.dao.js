import petModel from "./models/pet.model.js";

class PetDaoMongo {
    constructor() {
        this.pet = petModel
    };

    insertMany = async(pets) => {
        try {
            return await this.pet.insertMany(pets);
        } catch (error) {
            throw new Error(error);
        };
    };

    findAll = async() => {
        try {
            return await this.pet.find();
        } catch (error) {
            throw new Error(error);
        };
    };
};

export const petDao = new PetDaoMongo();