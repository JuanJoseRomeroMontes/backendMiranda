import express, { NextFunction, Request, Response} from "express";
const router = express.Router();
import { BookingInterface } from "../interfaces/interfaces";
import { Booking } from "../services/bookingServices";

router.get('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: BookingInterface[] = Booking.getBookingList();
    return res.json({rooms});
})

router.get('/:id', (req:Request, res:Response) => {
    const booking: BookingInterface = Booking.getBooking(+req.params.id);
    return res.json({booking});
})

router.post('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create booking");
})

router.patch('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit booking");
})

router.delete('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete booking");
})

module.exports = router;