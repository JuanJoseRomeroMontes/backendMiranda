import "dotenv/config";
import express, { Request, Response} from "express";
import { Login } from "../services/loginServices";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const verification = await Login.checkUser(email, password)
    
    if(verification.allowAcces){
        const token = await Login.generateToken(email);
        return res.json({token:token, name:verification.name, photo:verification.photo});
    }
    return res.status(401).json({message:"Invalid credentials"})
})

module.exports = router;