import express, { NextFunction, Request, Response} from "express";
import { UserInterface } from "../interfaces/interfaces";
import { User } from "../services/userServices";
import { authenticateToken } from "../middlware/auth";
const router = express.Router();

router.get('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: UserInterface[] = User.getuserList();
    return res.json({rooms});
})

router.get('/:id', authenticateToken, (req:Request, res:Response) => {
    const user: UserInterface = User.getuser(+req.params.id);
    return res.json({user});
})

router.post('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create user");
})

router.patch('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit user");
})

router.delete('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete user");
})

module.exports = router;