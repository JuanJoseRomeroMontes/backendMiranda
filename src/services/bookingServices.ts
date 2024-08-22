import { BookingSimpleInterface, BookingSimpleInterfaceNOId } from '../interfaces/interfaces';
import { bookingModel } from '../schemas/bookingSchema';
import { APIError } from '../utils/utils';
import { Room } from './roomsServices';

export class Booking {
    static async getBookingList(){
        const allBookings = await bookingModel.find();
        return allBookings;
    }

    static async getBooking(id:string){
        const booking = await bookingModel.findById(id);

        if (!booking)
            throw new APIError('Cannot find booking', 404, true);
            
        return booking;
    }

    static async createBooking(booking:BookingSimpleInterfaceNOId, roomId:string){
        const room = await Room.getRoom(roomId);
        if (!room) {
            throw new APIError(`Cannot find the booking's roomId in the rooms Database`, 404, true);
        }
        try {
            const newBooking = new bookingModel({ ...booking, roomType:1, roomNumber: 1});
            const insertedBooking = await newBooking.save();
            return insertedBooking;
        } catch (error:any) {
            throw new APIError(`Unexpected error while creating new booking. Message:${error.message}`, 500, true);
        }
    }

    static async updateBooking(booking:BookingSimpleInterface){
        try {
            const updatedBooking = await bookingModel.findByIdAndUpdate(booking._id, booking, { new: true });
            return updatedBooking;
        } catch (error) {
            throw new APIError(`Unexpected error while updating booking, make sure that the booking exist in the Database`, 500, true);
        }
        
    }

    static async deleteBooking(id:string){
        const deletedBooking = await bookingModel.findByIdAndDelete(id);
        if (!deletedBooking) 
            throw new APIError('Cannot delete booking because it does not exist', 404);
        return deletedBooking;
    }
}
