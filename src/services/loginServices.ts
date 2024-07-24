import { userModel } from "../schemas/userSchema";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export class Login {
    static async generateToken(email:string){
        return jwt.sign(email, process.env.TOKEN_SECRET);;
    }

    static async checkUser(inputedEmail:string, inputedPassword:string):Promise<boolean> {
        let passMatch = false;
    
        const fetchedEmailList = await userModel.find({ email: inputedEmail });
        if (fetchedEmailList.length < 1)
            return false;
        
        passMatch = await bcrypt.compare(inputedPassword, fetchedEmailList[0].password);
        
        return passMatch;
    }
}
