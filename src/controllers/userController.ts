import express, { NextFunction, Request, Response} from "express";
import { User } from "../services/userServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await User.getUserList();
        return res.json({users});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.getUser(req.params.id);
        return res.json({user});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.createUser(req.body);
        return res.json({user});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.updateUser(req.body);
        return res.json({user});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.deleteUser(req.params.id);
        return res.json({user});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

module.exports = router;