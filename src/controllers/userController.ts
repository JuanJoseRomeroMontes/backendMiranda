import express, { Request, Response} from "express";
import { UserInterface } from "../interfaces/interfaces";
import { User } from "../services/userServices";
const router = express.Router();

router.get('/', (_req:Request, res:Response) => {
    const users: UserInterface[] = User.getuserList();
    return res.json({users});
})

router.get('/:id', (req:Request, res:Response) => {
    const user: UserInterface = User.getuser(+req.params.id);
    return res.json({user});
})

router.post('/', (_req:Request, res:Response) => {
    return res.send("WIP create user");
})

router.patch('/:id', (_req:Request, res:Response) => {
    return res.send("WIP edit user");
})

router.delete('/:id', (_req:Request, res:Response) => {
    return res.send("WIP delete user");
})

module.exports = router;