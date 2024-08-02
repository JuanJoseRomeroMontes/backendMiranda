import express, { NextFunction, Request, Response} from "express";
import { User } from "../services/userServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const users = await User.getUserList();
        return res.json({users});
    } catch (error) {
        console.log("Booking not found controller")
        next(error)
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const user = await User.getUser(req.params.id);
        return res.json({user});
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const user = await User.createUser(req.body);
        return res.json({user});
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const user = await User.updateUser(req.body);
        return res.json({user});
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const user = await User.deleteUser(req.params.id);
        return res.json({user});
    } catch (error) {
        next(error)
    }
})

module.exports = router;