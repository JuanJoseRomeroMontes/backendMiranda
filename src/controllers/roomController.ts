import express, { NextFunction, Request, Response} from "express";
import { RoomInterface } from "../interfaces/interfaces";
import { Room } from "../services/roomsServices";
const router = express.Router();

router.get('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: RoomInterface[] = Room.getRoomList();
    return res.json({rooms});
})
 
router.get('/:id', (req:Request, res:Response) => {
    const room: RoomInterface = Room.getRoom(+req.params.id);
    return res.json({room});
})

router.post('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create room");
})

router.patch('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit room");
})

router.delete('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete room");
})

module.exports = router;