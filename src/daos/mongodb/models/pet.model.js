import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const petSchema = new Schema ({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },

    species: {
        type: String,
        required: [true, "La specie es obligatoria"]
    },

    age: {
        type: Number,
        required: [true, "La edad es obligatoria"]
    }
});

petSchema.plugin(mongoosePaginate)
const petModel = model("pets", petSchema)
export default petModel