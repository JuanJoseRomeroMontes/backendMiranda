import "dotenv/config";
import express, { Express} from "express";
const roomController = require("./controllers/roomController");
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");
const contactController = require("./controllers/contactController");
const loginController = require("./controllers/loginController");

export const app: Express = express();
app.use(express.json())
app.use('/login', loginController)
app.use('/room', roomController)
app.use('/user', userController)
app.use('/booking', bookingController)
app.use('/contact', contactController)

/*
app.use((err: Error, req: Request, res:Response) => {
    console.error(err)
    console.log(req)
    return res.status(500).json({error:true, message: "Aplication error"});
})
*/