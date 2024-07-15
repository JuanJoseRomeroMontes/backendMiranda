import express, { NextFunction, Request, Response} from "express";
import { RoomInterface } from "../interfaces/interfaces";
import { Room } from "../services/roomsServices";
import { authenticateToken } from "../middlware/auth";
const router = express.Router();

router.get('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: RoomInterface[] = Room.getRoomList();
    return res.json({rooms});
})

router.get('/:id', authenticateToken, (req:Request, res:Response) => {
    const room: RoomInterface = Room.getRoom(+req.params.id);
    return res.json({room});
})

router.post('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create room");
})

router.patch('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit room");
})

router.delete('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete room");
})

module.exports = router;