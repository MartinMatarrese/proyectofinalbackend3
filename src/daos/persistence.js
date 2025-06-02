import { prodDao as prodDaoFs } from "./filesystem/product.dao.js";
import { prodDao as prodDaoMongo } from "./mongodb/product.dao.js";
import { cartDao as cartDaoFs } from "./filesystem/cart.dao.js";
import { cartDao as cartDaoMongo } from "./mongodb/cart.dao.js";
import { ticketDao as ticketDaoFs } from "./filesystem/ticket.dao.js";
import { ticketDao as ticketDaoMongo } from "./mongodb/ticket.dao.js";
import { userDao as userDaoFs } from "./filesystem/user.dao.js";
import { userDao as userDaoMongo } from "./mongodb/user.dao.js";
import { petDao as petDaoMongo } from "./mongodb/pet.dao.js";
import { petDao as petDaoFs} from "./filesystem/pet.dao.js";
import { initMongoDB } from "../db/dbConfig.js";

let prodDao;

let cartDao;

let ticketDao;

let userDao;

let petDao;

const persistence = process.env.PERSISTENCE || "fs";
console.log("Modo de persistencia recibido:", persistence);


switch(persistence) {
    case "fs":
        prodDao = prodDaoFs;
        cartDao = cartDaoFs;
        ticketDao = ticketDaoFs;
        userDao = userDaoFs;
        petDao = petDaoFs; 
        console.log(persistence);
        break;
    case "mongo":
        prodDao = prodDaoMongo;
        cartDao = cartDaoMongo;
        ticketDao = ticketDaoMongo;
        userDao = userDaoMongo;
        petDao = petDaoMongo
        await initMongoDB()
        .then(() => console.log("Base de datos conectada"))
        .catch((error) => console.log(error))
        console.log(persistence);
        break;
    default:
        prodDao = prodDaoFs;
        cartDao = cartDaoFs
        ticketDao = ticketDaoFs;
        userDao = userDaoFs;
        petDao = petDaoFs;
        break;    
};
console.log("UserDao seleccionado:", userDao);


export default { prodDao, cartDao, ticketDao, userDao, petDao };