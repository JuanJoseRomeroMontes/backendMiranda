import express, { Request, Response} from "express";
import { Booking } from "../services/bookingServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response) => {
    const bookings = Booking.getBookingList();
    return res.json({bookings});
})

router.get('/:id', async (req:Request, res:Response) => {
    const booking = Booking.getBooking(req.params.id);
    return res.json({booking});
})

router.post('/', async (req:Request, res:Response) => {
    //Traer datos de room y pasarlos a createBooking
    const booking = Booking.createBooking(req.body, req.body.roomId);
    return res.json({booking});
})

router.patch('/:id', async (req:Request, res:Response) => {
    const booking = Booking.updateBooking(req.body);
    return res.json({booking});
})

router.delete('/:id', async (req:Request, res:Response) => {
    const booking = Booking.deleteBooking(req.params.id);
    return res.json({booking});
})

module.exports = router;