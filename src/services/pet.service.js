import { petRepository } from "../repository/pet.respository.js";
import { generatePet } from "../utils/pet.utils.js";

class PetService {
    constructor() {
        this.repository = petRepository;
    };

    generatePets = async(cant = 10) => {
        try {
            const pets = [];
            for(let i = 0; i < cant; i++) {
                pets.push(generatePet());
            };
            return await this.repository.insertManyPets(pets)
        } catch (error) {
            throw new Error(error);
        };
    };

    getPets = async() => {
        try {
            return await this.repository.getAll();
        } catch (error) {
            throw new Error(error);
        };
    };
};

export const petService = new PetService();