import express, { Request, Response} from "express";
import { User } from "../services/userServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response) => {
    const users = await User.getUserList();
    return res.json({users});
})

router.get('/:id', async (req:Request, res:Response) => {
    const user = await User.getUser(+req.params.id);
    return res.json({user});
})

router.post('/', async (req:Request, res:Response) => {
    const user = await User.createUser(req.body);
    return res.json({user});
})

router.patch('/:id', async (req:Request, res:Response) => {
    const user = await User.updateUser(req.body);
    return res.json({user});
})

router.delete('/:id', async (req:Request, res:Response) => {
    const user = await User.deleteUser(+req.params.id);
    return res.json({user});
})

module.exports = router;