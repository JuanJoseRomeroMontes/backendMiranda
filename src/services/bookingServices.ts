import { BookingSimpleInterface } from '../interfaces/interfaces';
import { bookingModel } from '../schemas/bookingSchema';
import { Room } from './roomsServices';

export class Booking {
    static async getBookingList(){
        const allBookings = await bookingModel.find();
        return allBookings;
    }

    static async getBooking(id:string){
        const booking = bookingModel.findById(id);
        if (!booking) 
            throw new Error('Cannot find booking');
        return booking;
    }

    static async createBooking(booking:BookingSimpleInterface, roomId:string){
        const room = await Room.getRoom(roomId);
        const newBooking = new bookingModel({ ...booking, roomType: room?.roomType, roomNumber: room?.roomNumber});
        const insertedBooking = await newBooking.save();
        return insertedBooking;
    }

    static async updateBooking(booking:BookingSimpleInterface){
        const id = booking._id;
        await bookingModel.updateOne({ id }, booking);
        const updatedBooking = await bookingModel.findById(id);
        return updatedBooking;
    }

    static async deleteBooking(id:string){
        const deletedBooking = await bookingModel.findByIdAndDelete(id);
        if (!deletedBooking) 
            throw new Error(`Cannot delete booking because it doesn't exist`);
        return deletedBooking;
    }
}
