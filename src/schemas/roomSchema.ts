import { Schema, model } from 'mongoose';
import { RoomInterface } from '../interfaces/interfaces';

export const roomSchema = new Schema<RoomInterface>({
  roomNumber: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  roomType: { type: String, required: true },
  description: { type: String, required: true },
  offer: { type: Boolean, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  cancellation: { type: String, required: true },
  amenities: { type: [String], required: true },
  photosArray: { type: [String], required: true }
});

export const roomModel = model<RoomInterface>('Room', roomSchema);