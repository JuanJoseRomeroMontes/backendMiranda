import bookingsJson from '../data/bookingsData.json';
import { BookingInterface } from '../interfaces/interfaces';

export class Booking {
    static getBookingList():BookingInterface[]{
        return bookingsJson;
    }

    static getBooking(id:number):BookingInterface{
        const booking: BookingInterface | undefined = bookingsJson.find(booking => booking.id === id);
        if (!booking) 
            throw new Error('Cannot find booking');
        return booking;
    }

    static createBooking(booking:BookingInterface):BookingInterface{
        //Add booking and return it
        return booking;
    }

    static updateBooking(booking:BookingInterface):BookingInterface{
        //Update booking and return it
        return booking;
    }

    static deleteBooking(id:number){
        //Delete booking
        console.log(id)
    }
}
