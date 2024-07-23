import express, { Request, Response} from "express";
import { Room } from "../services/roomsServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response) => {
    const rooms = await Room.getRoomList();
    return res.json({rooms});
})

router.get('/:id', async (req:Request, res:Response) => {
    const room = await Room.getRoom(req.params.id);
    return res.json({room});
})

router.post('/', async (req:Request, res:Response) => {
    const room = await Room.createRoom(req.body);
    return res.json({room});
})

router.patch('/:id', async (req:Request, res:Response) => {
    const room = await Room.updateRoom(req.body);
    return res.json({room});
})

router.delete('/:id', async (req:Request, res:Response) => {
    const room = await Room.deleteRoom(req.params.id);
    return res.json({room});
})

module.exports = router;