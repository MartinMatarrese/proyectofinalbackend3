import express from "express";
import { Server } from "socket.io";
import path  from "path";
import { __dirname } from "./patch.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import multerRouter from "./routes/image.routes.js";
import chatRouter from "./routes/chat.routes.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import userRouter from "./routes/users.routes.js";
import { errorHandler } from "./middlewares/errorhandler.js";
import mockRouter from "./routes/mocks.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import { info } from "./docs/info.js";
import swaggerUI from "swagger-ui-express";
import { reqlog } from "./middlewares/rqlog.js";



const app = express();
const PORT = 8080;
const specs = swaggerJSDoc(info);
const server = app.listen(PORT, () => {
    console.log("server on port", PORT);    
})

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: {secret: process.env.SECRET_KEY},
        ttl: 160
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 160000 }
};


const io = new Server(server)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(reqlog);

app.use(cookieParser());

app.use(session(storeConfig));

app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(__dirname + "/public"));

app.use("/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/api/mocks", mockRouter);

app.use("/api/chat", chatRouter)

app.use("/upload", multerRouter);


app.get("/", (req, res) => {
    res.status(200).send("Ok");
});

app.use(errorHandler);

let mensajes = [];

io.on("connection", (socket) => {
    console.log("Usuario conectado: ", socket.id);
    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido: ", data);
        mensajes.push(data);
        socket.emit("respuesta", mensajes)        
    })
    socket.on("disconnect", () => {
        console.log("Usuario desconectad: ", socket.id);        
    })
    
});

export default app