import express, { NextFunction, Request, Response} from "express";
import { BookingInterface } from "../interfaces/interfaces";
import { Booking } from "../services/bookingServices";
import { authenticateToken } from "../middlware/auth";
const router = express.Router();

router.get('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: BookingInterface[] = Booking.getBookingList();
    return res.json({rooms});
})

router.get('/:id', authenticateToken, (req:Request, res:Response) => {
    const booking: BookingInterface = Booking.getBooking(+req.params.id);
    return res.json({booking});
})

router.post('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create booking");
})

router.patch('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit booking");
})

router.delete('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete booking");
})

module.exports = router;