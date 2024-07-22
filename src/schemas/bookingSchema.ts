import { Schema, model } from 'mongoose';
import { BookingInterface } from '../interfaces/interfaces';

export const bookingSchema = new Schema<BookingInterface>({
  fullName: { type: String, required: true },
  bookDate: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  specialRequest: { type: String, required: true },
  roomId: { type: Number, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  status: { type: String, required: true }
});

export const bookingModel = model<BookingInterface>('Booking', bookingSchema);