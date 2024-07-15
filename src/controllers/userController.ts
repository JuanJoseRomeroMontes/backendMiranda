import express, { NextFunction, Request, Response} from "express";
import { UserInterface } from "../interfaces/interfaces";
import { User } from "../services/userServices";
const router = express.Router();

router.get('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: UserInterface[] = User.getuserList();
    return res.json({rooms});
})

router.get('/:id', (req:Request, res:Response) => {
    const user: UserInterface = User.getuser(+req.params.id);
    return res.json({user});
})

router.post('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create user");
})

router.patch('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit user");
})

router.delete('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete user");
})

module.exports = router;