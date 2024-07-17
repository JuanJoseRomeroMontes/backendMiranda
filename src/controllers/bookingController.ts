import express, { Request, Response} from "express";
import { BookingInterface } from "../interfaces/interfaces";
import { Booking } from "../services/bookingServices";
const router = express.Router();

router.get('/', (_req:Request, res:Response) => {
    const bookings: BookingInterface[] = Booking.getBookingList();
    return res.json({bookings});
})

router.get('/:id', (req:Request, res:Response) => {
    const booking: BookingInterface = Booking.getBooking(+req.params.id);
    return res.json({booking});
})

router.post('/', (_req:Request, res:Response) => {
    return res.send("WIP create booking");
})

router.patch('/:id', (_req:Request, res:Response) => {
    return res.send("WIP edit booking");
})

router.delete('/:id', (_req:Request, res:Response) => {
    return res.send("WIP delete booking");
})

module.exports = router;