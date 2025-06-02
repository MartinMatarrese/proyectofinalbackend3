import persistence from "../daos/persistence.js";
import PetReqDto from "../dtos/pet.req.dto.js";
import PetResDto from "../dtos/pet.res.dto.js";

const { petDao } = persistence;

class PetRepository {
    constructor() {
        this.dao = petDao
    };

    createPets = async(pets) => {
        try {
            const pet = new PetReqDto(pets);
            return await this.dao.createPets(pet);
        } catch (error) {
            throw new Error(error);
        };
    };

    insertManyPets = async(pets) => {
        try {
            const pet = pets.map(p => new PetReqDto(p));
            const savedPets = await this.dao.insertMany(pet);
            return savedPets.map(p => new PetResDto(p));
        } catch (error) {
            throw new Error(`Error en petRepository: ${error.message}`);
        };
    };

    getAll = async() => {
        try {
            const pets = await this.dao.getAll();
            return pets.map(p => new PetResDto(p));
        } catch (error) {
            throw new Error(error);
        };
    };
};

export const petRepository = new PetRepository();