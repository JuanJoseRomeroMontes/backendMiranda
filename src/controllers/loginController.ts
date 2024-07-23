import "dotenv/config";
import express, { Request, Response} from "express";
import { userModel } from "../schemas/userSchema";
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/', async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const allowAcces = await checkUser(email, password)
    
    if(allowAcces){
        const token = jwt.sign(email, process.env.TOKEN_SECRET);
        return res.json({token});
    }
    return res.status(401).json({message:"Invalid credentials"})
})

async function checkUser(inputedEmail:string, inputedPassword:string):Promise<boolean> {
    let passMatch = false;

    const fetchedEmailList = await userModel.find({ email: inputedEmail });
    if (fetchedEmailList.length < 1)
        return false;
    
    passMatch = await bcrypt.compare(inputedPassword, fetchedEmailList[0].password);
    
    if(passMatch)
        return true;
    else
        return false;
}

module.exports = router;