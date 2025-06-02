import MongoDao from "./mongo.dao.js";
import { userModel } from "./models/user.model.js";

class userDaoMongo extends MongoDao {
    constructor() {
        super(userModel)
    }

    async register(user) {
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    async getById(id) {
        try {
            return await this.model.findById(id).populate("cart");
        } catch (error) {
            throw new Error(error);
        }
    };

    async getByEmail(email) {
        try {
            return await this.model.findOne({email});
        } catch (error) {
            throw new Error(error);
        }
    };

    async insertMany(users) {
        try {
            return await userModel.insertMany(users);
        } catch (error) {
            throw new Error(error);
        };
    };

    async findAll() {
        try {
            return await userModel.find();
        } catch (error) {
            throw new Error(error);
        };
    };
}

export const userDao = new userDaoMongo();