import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class PetDaoFs {
    constructor(path) {
        this.path = path
    };

    getAll = async() => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            throw new Error(`Error al leer los archivos de mascotas: ${error.message}`);
        };
    };

    getById = async(id) => {
        try {
            const pets = await this.getAll();
            return pets.find(pet => pet.id === id) || null;
        } catch (error) {
            throw new Error(`Error al obtener la mascota: ${error.message}`);
        };
    };

    insertMany = async(pets) => {
        try {
            const existingPets = await this.getAll();
            const newPets = pets.map(p => ({
                id: uuidv4(),
                ...p
            }));
            const updatedPets = [...existingPets, ...newPets];
            await fs.promises.writeFile(this.path, JSON.stringify(updatedPets, null, 2));
            return newPets;
        } catch (error) {
            throw new Error(`Error al guardar las mascotas: ${error.message}`);
        };
    };
};

export const petDao = new PetDaoFs("./src/pets.json");