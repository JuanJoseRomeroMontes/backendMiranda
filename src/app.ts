import "dotenv/config";
import express, { Express, Request, Response} from "express";
import { authenticateToken } from "./middlware/auth";
const roomController = require("./controllers/roomController");
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");
const contactController = require("./controllers/contactController");
const loginController = require("./controllers/loginController");
const dotenv = require('dotenv');
dotenv.config();

export const app: Express = express();
app.use(express.json())

app.use('/login', loginController)
app.use('/room', authenticateToken, roomController)
app.use('/user', authenticateToken, userController)
app.use('/booking', authenticateToken, bookingController)
app.use('/contact', authenticateToken, contactController)

app.use('/', (req:Request, res:Response) => {
    console.log(req)
    res.send('API Miranda | Juan José Romero Montes \nRoutes: /room, /room/[número], /contact, /contact[número], /booking, /booking[número], /user, /user[número]')
});

/*
app.use((err: Error, req: Request, res:Response) => {
    console.error(err)
    console.log(req)
    return res.status(500).json({error:true, message: "Aplication error"});
})
*/