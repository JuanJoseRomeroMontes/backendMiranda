import express, { NextFunction, Request, Response} from "express";
import { Booking } from "../services/bookingServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const bookings = await Booking.getBookingList();
        return res.json({bookings});
    } catch (error) {
        console.log("Booking not found controller")
        next(error)
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const booking = await Booking.getBooking(req.params.id);
        return res.json({booking});
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    //Traer datos de room y pasarlos a createBooking
    try {
        const booking = await Booking.createBooking(req.body.booking, req.body.roomId);
        return res.json({booking});
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const booking = await Booking.updateBooking(req.body);
        return res.json({booking});
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const booking = await Booking.deleteBooking(req.params.id);
        return res.json({booking});
    } catch (error) {
        next(error)
    }
})

module.exports = router;