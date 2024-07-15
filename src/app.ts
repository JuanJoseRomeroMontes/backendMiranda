import "dotenv/config";
import express, { Express, Request, Response} from "express";
const roomController = require("./controllers/roomController");
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");
const contactController = require("./controllers/contactController");

export const app: Express = express();

app.use('/room', roomController)
app.use('/user', userController)
app.use('/booking', bookingController)
app.use('/contact', contactController)

app.use((err: Error, req: Request, res:Response) => {
    console.error(err)
    console.log(req)
    return res.status(500).json({error:true, message: "Aplication error"});
})