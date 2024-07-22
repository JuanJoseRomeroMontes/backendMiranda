import { BookingInterface } from '../interfaces/interfaces';
import { bookingModel } from '../schemas/bookingSchema';

export class Booking {
    static async getBookingList(){
        const allBookings = await bookingModel.find();
        return allBookings;
    }

    static async getBooking(id:number){
        const booking = bookingModel.findById(id);
        if (!booking) 
            throw new Error('Cannot find booking');
        return booking;
    }

    static async createBooking(booking:BookingInterface){
        const newBooking = new bookingModel({ ...booking });
        const insertedBooking = await newBooking.save();
        return insertedBooking;
    }

    static async updateBooking(booking:BookingInterface){
        const id = booking.id;
        await bookingModel.updateOne({ id }, booking);
        const updatedBooking = await bookingModel.findById(id);
        return updatedBooking;
    }

    static async deleteBooking(id:number){
        const deletedBooking = await bookingModel.findByIdAndDelete(id);
        if (!deletedBooking) 
            throw new Error(`Cannot delete booking because it doesn't exist`);
        return deletedBooking;
    }
}
