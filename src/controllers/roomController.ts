import express, { NextFunction, Request, Response} from "express";
import { Room } from "../services/roomsServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const rooms = await Room.getRoomList();
        return res.json({rooms});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const room = await Room.getRoom(req.params.id);
        return res.json({room});
    } catch (error) {
        next(error)
        return res.json({});
    }

})

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const room = await Room.createRoom(req.body);
        return res.json({room});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const room = await Room.updateRoom(req.body);
        return res.json({room});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const room = await Room.deleteRoom(req.params.id);
        return res.json({room});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

module.exports = router;