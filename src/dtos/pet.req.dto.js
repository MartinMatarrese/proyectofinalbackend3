export default class PetReqDto {
    constructor(pet) {
        this.id = pet.id;
        this.name = pet.name;
        this.specie = pet.specie;
        this.age = pet.age;
    };
};