import "dotenv/config";
import express, { Express, Request, Response} from "express";
//import { authenticateToken } from "./middlware/auth";
const roomController = require("./controllers/roomController");
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");
const contactController = require("./controllers/contactController");
const loginController = require("./controllers/loginController");
const dotenv = require('dotenv');
dotenv.config();
import { APIError } from "./utils/utils";
import mysql from 'mysql2/promise';

let cors = require('cors');
export const app: Express = express();
app.use(express.json())
app.use(cors())

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/', (_req:Request, res:Response) => {
    res.send('API Miranda | Juan José Romero Montes \nRoutes: /room, /room/[número], /contact, /contact[número], /booking, /booking[número], /user, /user[número]')
});

app.use('/login', loginController)
app.use('/room', roomController)
app.use('/user', userController)
app.use('/booking', bookingController)
app.use('/contact', contactController)

app.use((err: APIError, req: Request, res:Response) => {
	let responseMessage = "Aplication error";
	if(err.safe)
		responseMessage = err.message
	
	console.error(`Status: ${err.status}. Message: ${responseMessage}. ${err.safe ? `Request: ${req}` :""}`)
	return res.status(err.status).json({error:true, message: responseMessage});
})