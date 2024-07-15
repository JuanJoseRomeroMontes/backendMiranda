import "dotenv/config";
import express, { Request, Response} from "express";
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/', (req: Request, res: Response) => {
    const {username, password} = req.body;
    if(username === "miranda@gmail.com" && password === "mirapass"){
        const token = jwt.sign(username, process.env.TOKEN_SECRET);
        return res.json({token});
    }
    return res.status(401).json({message:"Invalid credentials"})
})

module.exports = router;