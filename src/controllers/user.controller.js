import Controllers from "./controller.manager.js";
import { userService } from "../services/user.service.js";
import { petService } from "../services/pet.service.js";


class UserController extends Controllers {
    constructor() {
        super(userService)
    };

    register = async(req, res, next) => {
        try {
            const user = await this.service.register(req.body);
            return res.status(201).json(user);
        } catch(error) {
            res.status(500).json({error: "Error interno en el servidor"})
        }
    };

    login = async(req, res, next) => {
        try {
            const token = await this.service.login(req.body);
            res
            .status(201)
            .cookie("token", token, { httpOnly: true })
            .json({ message: "Login Ok", token});
        } catch(error) {
            if(error.message === "Usuario no encontrado" || error.message === "Credenciales incorrectas") {
                return res.status(401).json({ error: error.message });
            };
            next(error);
        };
    };

    privateData = async(req, res, next) => {
        try {
            if(!req.user)
                throw new Error("No se puede acceder a los datos del usuario");
                res.json({
                    user: req.user
                });
        } catch(error) {
            next(error)
        }
    };

    createUsers = async(req, res, next) => {
        try {
            const { cant } = req.body;
            const response = await userService.createUsersMock(Number(cant || 50));
            res.json(response);
        } catch (error) {
            next(error);
        };
    };

    generateData = async(req, res, next) => {
        try {
            const { users = 0, pets = 0} = req.body;
            const userCreated = await userService.createUsersMock(Number(users));
            const petsCreated = await petService.createPetsMock(Number(pets));
            res.json({ message: "Datos generados", userCreated, petsCreated});
        } catch(error) {
            next(error);
        }
    }
}

export const userController = new UserController();