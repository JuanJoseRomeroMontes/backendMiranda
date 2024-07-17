import express, { Request, Response} from "express";
import { RoomInterface } from "../interfaces/interfaces";
import { Room } from "../services/roomsServices";
const router = express.Router();

router.get('/', (_req:Request, res:Response) => {
    const rooms: RoomInterface[] = Room.getRoomList();
    return res.json({rooms});
})
 
router.get('/:id', (req:Request, res:Response) => {
    const room: RoomInterface = Room.getRoom(+req.params.id);
    return res.json({room});
})

router.post('/', (_req:Request, res:Response) => {
    return res.send("WIP create room");
})

router.patch('/:id', (_req:Request, res:Response) => {
    return res.send("WIP edit room");
})

router.delete('/:id', (_req:Request, res:Response) => {
    return res.send("WIP delete room");
})

module.exports = router;