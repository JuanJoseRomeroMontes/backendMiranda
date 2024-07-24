import { Schema, model } from 'mongoose';
import { BookingInterface } from '../interfaces/interfaces';

export const bookingSchema = new Schema<BookingInterface>({
  fullName: { type: String, required: true },
  bookDate: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  specialRequest: { type: String, required: true },
  roomId: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  status: { type: String, required: true }
});

export const bookingModel = model<BookingInterface>('Booking', bookingSchema);