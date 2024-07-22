import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try{
        jwt.verify(token, process.env.TOKEN_SECRET);

        return next()
    }
    catch(e){
        return res.sendStatus(401)
    }
}